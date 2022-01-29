import { StorylineEntity } from '../../lib/types';

export const uploadSuccessMsg = (
  t: Function,
  storylineEntity: StorylineEntity,
  isPrerelease?: boolean,
) => {
  let msg = t(
    'STORYLINES_UPLOAD_SUCCESS',
    'Your Storyline for "{name}" has been added.',
    'text describing that the storyline has been added',
    {
      name: storylineEntity.name,
    },
  );

  if (isPrerelease) {
    msg += t(
      'STORYLINES_PRERELEASE',
      ' Listeners will see it when your song is released.',
      'text indicating when storyline is visible',
    );
  }

  return msg;
};

export const uploadErrorMsg = (t: Function, storylineEntity: StorylineEntity) =>
  t(
    'STORYLINES_UPLOAD_ERROR_MSG',
    `Your Storyline for "{name}" didn't post.`,
    'text indicating storyline did not post',
    {
      name: storylineEntity.name,
    },
  );

export const removeSuccessMsg = (
  t: Function,
  storylineEntity: StorylineEntity,
) =>
  t(
    'STORYLINES_REMOVE_SUCCESS',
    'Your Storyline for "{name}" was removed.',
    'text indicating storyline was removed',
    {
      name: storylineEntity.name,
    },
  );

export const removeErrorMsg = (t: Function, storylineEntity: StorylineEntity) =>
  t(
    'STORYLINES_REMOVAL_ERROR2',
    `Your storyline for "{name}" wasn't removed.`,
    'error text indicating storyline was not removed',
    {
      name: storylineEntity.name,
    },
  );

export const uploadingProgressDelay = 8000;
