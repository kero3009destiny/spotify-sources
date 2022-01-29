// ignore-string-externalization
const experienceKind = Symbol('experience');

type ExperienceInit = {
  readonly id: string;
  readonly owner: string;
};

export type Experience = ExperienceInit & {
  [experienceKind]: true;
};

// todo: assertion function?
// export function isExperience(experience: Experience) {
//   return !!experience[experienceKind];
// }

export function defineExperience({ id, owner }: ExperienceInit): Experience {
  return {
    [experienceKind]: true,
    id,
    owner,
  };
}
