import { NoAccessResponse, ResponseError, ResponseJSON, getParams } from '@/lib/api';
import { connect } from '@/lib/mongo';
import { ProjectZ } from '@/lib/zod';
import Project from '@/models/Project';
import { z } from 'zod';

export type PostRequestInputT = z.infer<typeof ProjectZ>;
export async function POST(request: Request) {
  await connect();

  const input = (await request.json()) as PostRequestInputT;
  const safeInput = ProjectZ.safeParse(input);
  if (!safeInput.success) {
    console.info(safeInput.error.format());
    return ResponseError('Cannot save changes. Invalid input.');
  }

  if (!input.owner) {
    return NoAccessResponse;
  }

  // get project by owner
  const existingProject = await Project.findOne({ owner: input.owner });
  if (existingProject) {
    await Project.updateOne({ owner: input.owner }, safeInput.data);
  } else {
    await Project.create(safeInput.data);
  }

  return ResponseJSON(input);
}
