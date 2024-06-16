'use client';

import { FREE_PLAN_MAX_IMAGES, FREE_PLAN_MAX_LAYERS, FREE_PLAN_MAX_TRAITS } from '@/config';
import { db } from '@/lib/db';
import { RarityType } from '@/lib/enums';
import {
  addRankings,
  addRatings,
  createTraitStore,
  getRandomTrait,
  getTraitsFromTraitStore,
  handleBlockTraits,
  handleForceTraits,
} from '@/lib/project';
import { LayerT, PreviewItemT, ProjectT, TraitT } from '@/lib/types';
import { saveAs } from 'file-saver';
import React, { useEffect } from 'react';
import { UseFormReturn, useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { v4 as uuid } from 'uuid';
import { useUser } from './UserProvider';

type ContextT = {
  form: UseFormReturn<ProjectT, any, undefined>;
  project: ProjectT;
  layers: LayerT[];
  customs: PreviewItemT[];
  activeLayer: string;
  activeLayerDetails?: LayerT;
  activeLayerIndex: number;
  activeStep: number;
  sortBy: string;
  generateIsLoading: boolean;
  previewItems: PreviewItemT[];
  filteredPreviewItems: PreviewItemT[];
  activeFilters: { traitType: string; traitValue: string }[];
  localSaving: boolean;
  localSaved: boolean;
  localError: string;
  localDataFetched?: boolean;
  dbSaving?: boolean;
  dbSaved?: boolean;
  dbError?: string;
  dbDataFetched?: boolean;
  hasChanges?: boolean;
  setOriginalProject: (project: ProjectT) => void;
  saveProject: () => void;
  selectLayer: (index: string) => void;
  selectStep: (index: number) => void;
  setSortBy: (sortBy: string) => void;
  resetProject: () => void;
  formatTrait: (file: any) => TraitT;
  deleteLayer: (index: number) => void;
  deleteTrait: (layer: LayerT, trait: TraitT) => void;
  generatePreviewItems: () => void;
  autofillRarity: (layerIndex: number) => void;
  filterPreviewItems: (e: any, traitType: string, traitValue: string) => void;
  addCustom: () => void;
  deleteCustom: (index: string) => void;
  downloadBackup: () => void;
  resetOriginalProject: () => void;
};

export const ProjectContext = React.createContext<ContextT>({} as ContextT);

type Props = {
  children: React.ReactNode;
};

const ProjectProvider = ({ children }: Props) => {
  const { isSubscribed } = useUser();
  const [originalProject, setOriginalProject] = React.useState<ProjectT>(); // todo - used to check for changes compared to db
  const [activeLayer, setActiveLayer] = React.useState<string>('');
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [sortBy, setSortBy] = React.useState('name'); // ['name', 'rarity']
  const [activeFilters, setActiveFilters] = React.useState<{ traitType: string; traitValue: string }[]>([]);
  const [localSaving, setLocalSaving] = React.useState<boolean>(false);
  const [localSaved, setLocalSaved] = React.useState<boolean>(false);
  const [localDataFetched, setLocalDataFetched] = React.useState<boolean>();
  const [localError, setLocalError] = React.useState<string>('');

  const [generateIsLoading, setGenerateIsLoading] = React.useState<boolean>(false);

  const [dbSaving, setDbSaving] = React.useState<boolean>(false);
  const [dbSaved, setDbSaved] = React.useState<boolean>(false);
  const [dbError, setDbError] = React.useState<string>('');
  const [dbDataFetched, setDbDataFetched] = React.useState<boolean>();

  const form = useForm<ProjectT>({
    defaultValues: {
      name: '',
      size: 0,
      layers: [],
      customs: [],
      previewItems: [],
    },
    mode: 'onChange',
  });
  const { append } = useFieldArray({
    control: form.control,
    name: 'customs',
  });
  const hasChanges = form.formState.isDirty;

  const project = originalProject || form.watch();
  const layers = project.layers || [];
  const previewItems = project.previewItems || [];
  const customs = project.customs || [];

  const activeLayerDetails = layers.find((f) => f.id === activeLayer);
  const activeLayerIndex = layers.findIndex((f) => f.id === activeLayer) !== -1 ? layers.findIndex((f) => f.id === activeLayer) : 0;

  // const saveMutation = useMutation({
  //   url: '/api/projects',
  //   method: 'POST',
  //   showToast: false,
  //   onMutate: () => {
  //     setDbSaving(true);
  //     setDbSaved(false);
  //     setDbError('');
  //   },
  //   onSettled: () => {
  //     setDbSaving(false);
  //   },
  //   onSuccess: () => {
  //     setDbSaved(true);
  //     setTimeout(() => {
  //       setDbSaved(false);
  //     }, 4000);
  //   },
  //   onError: (error: any) => {
  //     console.error(error);
  //     setDbError(error.message || 'Something went wrong');
  //   },
  // });

  const filteredPreviewItems = previewItems
    .filter((item) => {
      const itemTraits = Object.values(item.traits);
      const matches = itemTraits.filter((trait) => {
        const filter = activeFilters.find((f) => f.traitType === trait.trait_type);
        if (!filter) return false;

        const sameAs = layers.find((f) => f.name === trait.trait_type)?.traits.find((f) => f.id === trait.traitId)?.sameAs;
        const sameAsDetails = layers.find((f) => f.name === trait.trait_type)?.traits.find((f) => f.id === sameAs);
        if (sameAsDetails) {
          return filter.traitValue === sameAsDetails.name;
        }

        return filter.traitValue === trait.value;
      });
      return matches.length === activeFilters.length;
    })
    // @ts-ignore
    .sort((a: PreviewItemT, b: PreviewItemT) => {
      if (sortBy === 'rank') {
        return a.ranking - b.ranking;
      } else if (sortBy === 'rank-reverse') {
        return b.ranking - a.ranking;
      }
    });

  const selectLayer = (id: string) => {
    setActiveLayer(id);
  };

  const selectStep = (index: number) => {
    setActiveStep(index);
    setGenerateIsLoading(false);
  };

  const saveProjectLocally = async (input: ProjectT) => {
    try {
      setLocalSaving(true);
      setLocalSaved(false);
      setLocalError('');

      console.log(input);

      input.layers = input.layers.filter((f) => f.name && f.id);

      // check if exists
      const projects = await db.projects.toArray();
      if (projects.length > 0) {
        await db.projects.update(projects[0].id!, input);
        console.log('updated project');
      } else {
        await db.projects.add(input);
        console.log('created project');
      }
      setOriginalProject(input);
      setLocalSaved(true);
      form.reset(input);

      setTimeout(() => {
        setLocalSaved(false);
      }, 4000);
    } catch (error: any) {
      console.error(error);
      setLocalError(error.message || 'Something went wrong');
    } finally {
      setLocalSaving(false);
    }
  };

  const saveProject = async function () {
    const localProject = form.getValues();

    if (localProject.layers.length === 0) {
      return toast.error('Please add at least one layer');
    }

    if (!isSubscribed) {
      if (localProject.layers.length > FREE_PLAN_MAX_LAYERS) {
        return toast.error(`You have reached the maximum number of layers allowed in the free plan (${FREE_PLAN_MAX_LAYERS}).`);
      }

      if (localProject.size > FREE_PLAN_MAX_IMAGES) {
        return toast.error(`Collection size exceeds the limit of ${FREE_PLAN_MAX_IMAGES} images for the free plan.`);
      }

      for (const layer of localProject.layers) {
        if (layer.traits.length > FREE_PLAN_MAX_TRAITS) {
          return toast.error(`Layer ${layer.name} exceeds the limit of ${FREE_PLAN_MAX_TRAITS} traits for the free plan.`);
        }
      }
    }

    // @ts-ignore
    delete localProject._layerName;

    saveProjectLocally(localProject);

    // // todo - user should have to subscribe for this
    // if (activeAddress) {
    //   saveMutation.mutate(localProject);
    // } else {

    // }
  };

  const resetProject = async () => {
    if (!window.confirm('Are you sure you want to reset the project?')) return;
    await db.projects.clear();
    form.reset({
      name: '',
      size: 0,
      layers: [],
      previewItems: [],
    });
    setActiveLayer('');
    setLocalDataFetched(false);
    setLocalSaved(false);
    setLocalError('');
  };

  const addCustom = () => {
    const _customs = form.getValues('customs');
    const lastIndex = _customs.length || 0;
    const lastCustom = _customs[lastIndex - 1];

    append({
      index: lastCustom ? lastCustom.index + 1 : 1,
      traits: {},
      rating: 0,
      ranking: 0,
      id: uuid(),
    });
    resetOriginalProject();
    toast.success('Custom added');
  };

  const deleteCustom = (id: string) => {
    const _customs = form.getValues('customs');
    const updatedCustoms = _customs.filter((f) => f.id !== id);
    form.setValue('customs', updatedCustoms);
    resetOriginalProject();
    toast.success('Custom deleted');
  };

  const deleteLayer = (index: number) => {
    if (!window.confirm('Are you sure you want to delete this layer?')) return;
    setActiveLayer('');
    const layers = form.getValues('layers');
    layers.splice(index, 1);
    form.setValue('layers', layers);
    resetOriginalProject();
    toast.success('Layer deleted');
  };

  const deleteTrait = (layer: LayerT, trait: TraitT) => {
    if (!window.confirm('Are you sure you want to delete this trait?')) return;
    const traits = layer.traits.filter((f) => f.id !== trait.id);
    const layerIndex = layers.findIndex((f) => f.id === layer.id);
    form.setValue(`layers.${layerIndex}.traits`, traits);
    resetOriginalProject();
    toast.success('Trait deleted');
  };

  const formatTrait = (file: any): TraitT => {
    return {
      id: uuid(),
      name: file.name.replace(/\.[^/.]+$/, ''),
      type: file.type,
      size: file.size,
      data: file.data,
      alternatives: [],
      rules: [],
      rarity: 0,
      sameAs: '',
      excludeTraitFromRandomGenerations: false,
      rarityType: RarityType.PERCENT,
    };
  };

  const generatePreviewItems = async () => {
    const projectSize = form.getValues('size');
    const layers = form.getValues('layers');

    // * Check if total traits for each layer is less than project size
    if (!calculateTotalTraits(layers, projectSize)) {
      return;
    }

    if (!window.confirm('Are you sure you want to generate new images?')) return;

    // * Reset preview items
    form.setValue('previewItems', []);
    setOriginalProject({
      ...form.getValues(),
      previewItems: [],
    });
    setActiveFilters([]);

    setGenerateIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const customs = form.getValues('customs');
    const size = form.getValues('size');

    const items: PreviewItemT[] = [];
    const traitStore: { [key: string]: string[] } = createTraitStore(layers, size);

    const allErrors: string[] = [];
    for (let i = 0; i < size; i++) {
      try {
        const custom = customs.find((f) => f.index === i + 1);
        if (custom) {
          items.push(custom);
        } else {
          const { item, errors } = generatePreviewItem(items);
          allErrors.push(...errors);

          item.index = i + 1;
          items.push(item);
        }
      } catch (error) {
        allErrors.push('Maximum call stack size exceeded');
      }

      if (allErrors.length > 100) {
        toast.error(
          'Cannot create enough unique images. Please reduce the number of traits, increase the project size, or modify the rarity of traits.',
          {
            duration: 5000,
          }
        );
        setGenerateIsLoading(false);
        return;
      }
    }

    // add rating for each item
    addRatings(items, layers);
    addRankings(items);

    form.setValue('previewItems', items);

    resetOriginalProject();
    setGenerateIsLoading(false);

    function calculateTotalTraits(layers: LayerT[], projectSize: number) {
      for (const layer of layers) {
        const totalTraits = layer.traits.reduce((total: number, trait: TraitT) => {
          switch (trait.rarityType) {
            case 'percent':
              return total + (projectSize * trait.rarity) / 100;
            case 'number':
              return total + trait.rarity;
            default:
              return total;
          }
        }, 0);

        if (totalTraits + 1 < projectSize) {
          toast.error(`Total traits for ${layer.name} is less than project size`);
          return false;
        }
      }
      return true;
    }

    function generatePreviewItem(existingItems: PreviewItemT[]) {
      const errors = [];
      let previewItem: PreviewItemT = {
        index: 0,
        traits: {},
        rating: 0,
        ranking: 0,
        id: uuid(),
      };

      for (let j = 0; j < layers.length; j++) {
        const layer = layers[j];
        const availableTraits = getTraitsFromTraitStore(traitStore, layer);
        const trait = getRandomTrait(availableTraits);
        if (!trait) {
          errors.push(`No available traits for ${layer.name}`);
          continue;
        }
        const images = [trait.data, ...(trait.alternatives || []).map((f) => f.data)];
        const randomImage = images[Math.floor(Math.random() * images.length)];

        previewItem.traits[layer.name] = {
          trait_type: layer.name,
          value: trait.name,
          image: randomImage,
          excludeFromMetadata: layer.excludeFromMetadata,
          layerId: layer.id,
          traitId: trait.id,
        };
      }

      previewItem = handleForceTraits(previewItem, layers);
      previewItem = handleBlockTraits(previewItem, layers);

      // * Check for duplicates
      const itemStrings = existingItems.map((item) =>
        Object.values(item.traits)
          .map((trait) => trait.value)
          .join(',')
      );

      if (
        itemStrings.includes(
          Object.values(previewItem.traits)
            .map((trait) => trait.value)
            .join(',')
        )
      ) {
        return generatePreviewItem(existingItems);
      }

      // check to make sure all layers are included
      if (Object.keys(previewItem.traits).length !== layers.length) {
        return generatePreviewItem(existingItems);
      }

      // * Remove used traits from trait store
      Object.keys(previewItem.traits).forEach((key) => {
        const trait = previewItem.traits[key];
        const traitIndex = traitStore[key].findIndex((f) => f === trait.value);
        traitStore[key].splice(traitIndex, 1);
      });

      return { item: previewItem, errors };
    }
  };

  const autofillRarity = (layerIndex: number) => {
    const layers = form.getValues('layers');
    const layer = layers[layerIndex];
    const traits = layer.traits;
    const rarityPerTrait = 100 / traits.length;

    traits.forEach((trait) => {
      if (trait.rarityType === RarityType.PERCENT) {
        trait.rarity = rarityPerTrait;
      }
    });

    form.setValue(`layers.${layerIndex}.traits`, traits);
    toast.success('Rarity autofilled');
  };

  const filterPreviewItems = (e: any, traitType: string, traitValue: string) => {
    const checked = e.target.checked;

    if (checked) {
      setActiveFilters([
        ...activeFilters,
        {
          traitType,
          traitValue,
        },
      ]);
    } else {
      const newFilters = activeFilters.filter((f) => f.traitType !== traitType && f.traitValue !== traitValue);
      setActiveFilters(newFilters);
    }
  };

  const getProjectFromLocalDb = async () => {
    try {
      const projects = await db.projects.toArray();
      const project = projects[0];

      if (project) {
        form.reset(project);
        setOriginalProject(project);
        setActiveLayer(project.layers[0].id);
      }

      setLocalDataFetched(true);
    } catch (error) {
      console.error(error);
    }
  };

  const resetOriginalProject = () => {
    setOriginalProject(form.getValues());
  };

  const downloadBackup = () => {
    const data = new Blob([JSON.stringify(form.getValues(), null, 2)], { type: 'application/json' });
    saveAs(data, 'project.json');
  };

  // useEffect(() => {
  //   if (!originalProject || !project) return;
  //   const _originalProject: ProjectT = {
  //     ...originalProject,
  //     layers: originalProject.layers.map((layer) => ({
  //       ...layer,
  //       traits: layer.traits.map((trait) => ({
  //         ...trait,
  //         data: '',
  //       })),
  //     })),
  //   };
  //   const _project: ProjectT = {
  //     ...project,
  //     layers: project.layers.map((layer) => ({
  //       ...layer,
  //       traits: layer.traits.map((trait) => ({
  //         ...trait,
  //         data: '',
  //       })),
  //     })),
  //   };
  //   const _hasChanges = JSON.stringify(_originalProject) !== JSON.stringify(_project);
  //   console.log('1', _originalProject)
  //   console.log('2', _project)
  //   setHasChanges(_hasChanges);
  // }, [project, originalProject]);

  useEffect(() => {
    getProjectFromLocalDb();
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        // state
        form,

        project,
        layers,
        activeLayer,
        activeLayerDetails,
        activeLayerIndex,
        previewItems,
        generateIsLoading,
        filteredPreviewItems,
        selectLayer,
        activeStep,
        activeFilters,
        sortBy,

        setOriginalProject,

        localSaving,
        localSaved,
        localError,
        localDataFetched,

        dbSaving,
        dbSaved,
        dbError,
        dbDataFetched,

        hasChanges,

        customs,

        // methods
        saveProject,
        selectStep,
        setSortBy,
        resetProject,
        formatTrait,
        deleteTrait,
        deleteLayer,
        generatePreviewItems,
        autofillRarity,
        filterPreviewItems,
        addCustom,
        deleteCustom,
        downloadBackup,
        resetOriginalProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;

export const useProject = () => {
  const context = React.useContext(ProjectContext);

  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }

  return context;
};
