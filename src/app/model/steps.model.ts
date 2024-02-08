export enum StepName {
  AGE_RANGE = 'AGE_RANGE', //''
  BODY_SHAPE = 'BODY_SHAPE', //''
  DREAM_BODY_SHAPE = 'DREAM_BODY_SHAPE', //''
  LAST_TIME_BEST_BODY_SHAPE = 'LAST_TIME_BEST_BODY_SHAPE', //''
  PAIN_AREAS = 'PAIN_AREAS', // []
  HEIGHT = 'HEIGHT', // 0
  WEIGHT = 'WEIGHT', // 0
  DREAM_WEIGHT = 'DREAM_WEIGHT', // 0
  AGE = 'AGE', // 0
  WELLNESS_PROFILE = 'WELLNESS_PROFILE', // null
  JOURNEY = 'JOURNEY', // null
  GENERATING = 'GENERATING', // null
  EMAIL = 'EMAIL', // ''
  NAME = 'NAME', // ''
}

export interface OnboardingStep {
  step: StepName;
  data: any;
}
