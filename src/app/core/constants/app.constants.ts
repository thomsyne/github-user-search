interface ApplicationPathsType {
  readonly Landing: string;
  readonly LandingPathComponents: string[];
}
let applicationPaths: ApplicationPathsType = {
  Landing: '',
  LandingPathComponents: [],
};
applicationPaths = {
  ...applicationPaths,
  LandingPathComponents: applicationPaths.Landing.split('/'),
};

export const ApplicationPaths: ApplicationPathsType = applicationPaths;
