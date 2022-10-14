// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    navigateToSignUp: 'GO_TO_SIGN_UP';
    setEmail: 'SIGN_IN' | 'SIGN_UP';
    setPhrase:
      | 'done.invoke.authMachine.signingIn:invocation[0]'
      | 'done.invoke.authMachine.signingUp:invocation[0]';
    navigateToVerify: 'done.invoke.authMachine.signingIn:invocation[0]';
    setError:
      | 'error.platform.authMachine.signingIn:invocation[0]'
      | 'error.platform.authMachine.verify:invocation[0]'
      | 'error.platform.authMachine.signingUp:invocation[0]'
      | 'error.platform.authMachine.activate:invocation[0]'
      | 'error.platform.authMachine.authenticated:invocation[0]';
    setToken:
      | 'done.invoke.authMachine.verify:invocation[0]'
      | 'done.invoke.authMachine.activate:invocation[0]';
    navigateToSignIn: 'GO_TO_SIGN_IN';
    navigateToActivate: 'done.invoke.authMachine.signingUp:invocation[0]';
    setViewer: 'done.invoke.authMachine.authenticated:invocation[0]';
    navigateToHome: 'done.invoke.authMachine.authenticated:invocation[0]';
  };
  internalEvents: {
    'done.invoke.authMachine.signingIn:invocation[0]': {
      type: 'done.invoke.authMachine.signingIn:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.authMachine.signingUp:invocation[0]': {
      type: 'done.invoke.authMachine.signingUp:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.authMachine.signingIn:invocation[0]': {
      type: 'error.platform.authMachine.signingIn:invocation[0]';
      data: unknown;
    };
    'error.platform.authMachine.verify:invocation[0]': {
      type: 'error.platform.authMachine.verify:invocation[0]';
      data: unknown;
    };
    'error.platform.authMachine.signingUp:invocation[0]': {
      type: 'error.platform.authMachine.signingUp:invocation[0]';
      data: unknown;
    };
    'error.platform.authMachine.activate:invocation[0]': {
      type: 'error.platform.authMachine.activate:invocation[0]';
      data: unknown;
    };
    'error.platform.authMachine.authenticated:invocation[0]': {
      type: 'error.platform.authMachine.authenticated:invocation[0]';
      data: unknown;
    };
    'done.invoke.authMachine.verify:invocation[0]': {
      type: 'done.invoke.authMachine.verify:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.authMachine.activate:invocation[0]': {
      type: 'done.invoke.authMachine.activate:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.authMachine.authenticated:invocation[0]': {
      type: 'done.invoke.authMachine.authenticated:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    '': { type: '' };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    signInAuth: 'done.invoke.authMachine.signingIn:invocation[0]';
    verify: 'done.invoke.authMachine.verify:invocation[0]';
    signUpAuth: 'done.invoke.authMachine.signingUp:invocation[0]';
    activate: 'done.invoke.authMachine.activate:invocation[0]';
    getViewer: 'done.invoke.authMachine.authenticated:invocation[0]';
  };
  missingImplementations: {
    actions:
      | 'navigateToSignUp'
      | 'navigateToVerify'
      | 'navigateToSignIn'
      | 'navigateToActivate'
      | 'navigateToHome';
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    getViewer:
      | ''
      | 'done.invoke.authMachine.verify:invocation[0]'
      | 'done.invoke.authMachine.activate:invocation[0]';
    signInAuth: 'SIGN_IN';
    verify: 'done.invoke.authMachine.signingIn:invocation[0]';
    signUpAuth: 'SIGN_UP';
    activate: 'done.invoke.authMachine.signingUp:invocation[0]';
  };
  eventsCausingGuards: {
    isAuthenticated: '';
    hasValidEmail: 'SIGN_IN' | 'SIGN_UP';
  };
  eventsCausingDelays: {};
  matchesStates:
    | 'init'
    | 'signInForm'
    | 'signingIn'
    | 'verify'
    | 'signUpForm'
    | 'signingUp'
    | 'activate'
    | 'authenticated';
  tags: never;
}
