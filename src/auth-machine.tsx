import React, { useContext } from "react";
import { useSelector, useActor } from "@xstate/react";
import { useRouter } from "next/router";
import { assign, createMachine, StateFrom, InterpreterFrom } from "xstate";
import { useInterpret } from "@xstate/react";
import { getCookie } from "cookies-next";

export enum AuthMode {
  SignUp = "signup",
  SignIn = "signin"
}

interface AuthContext {
  email: string;
  phrase: string;
  retries: number;
  token: string | null;
  viewer: any | null;
  error: Error | null;
}

type AuthEvent =
  | { type: "AUTHED" }
  | { type: "SIGN_IN"; email: string }
  | { type: "SIGN_UP"; email: string }
  | { type: "GO_TO_SIGN_IN" }
  | { type: "GO_TO_SIGN_UP" };

export const authMachine = createMachine(
  {
    tsTypes: {} as import("../auth-machine.typegen").Typegen0,
    schema: {
      context: {} as AuthContext,
      events: {} as AuthEvent
    },
    id: "authMachine",
    initial: "init",
    context: {
      email: "",
      phrase: "",
      retries: 0,
      token: null,
      viewer: null,
      error: null
    },
    states: {
      init: {
        always: [
          { target: "authenticated", cond: "isAuthenticated" },
          { target: "signInForm" }
        ]
      },
      signInForm: {
        on: {
          GO_TO_SIGN_UP: {
            target: "signUpForm",
            actions: ["navigateToSignUp"]
          },
          SIGN_IN: {
            target: "signingIn",
            actions: ["setEmail"],
            cond: "hasValidEmail"
          }
        }
      },
      signingIn: {
        invoke: {
          src: "signInAuth",
          onDone: [
            { target: "verify", actions: ["setPhrase", "navigateToVerify"] }
          ],
          onError: [{ actions: ["setError"] }]
        }
      },
      verify: {
        invoke: {
          src: "verify",
          onDone: [{ target: "authenticated", actions: ["setToken"] }],
          onError: [{ actions: ["setError"] }]
        }
      },
      signUpForm: {
        on: {
          GO_TO_SIGN_IN: {
            target: "signInForm",
            actions: ["navigateToSignIn"]
          },
          SIGN_UP: {
            target: "signingUp",
            actions: ["setEmail"],
            cond: "hasValidEmail"
          }
        }
      },
      signingUp: {
        invoke: {
          src: "signUpAuth",
          onDone: [
            {
              target: "activate",
              actions: ["setPhrase", "navigateToActivate"]
            }
          ],
          onError: [{ actions: ["setError"] }]
        }
      },
      activate: {
        invoke: {
          src: "activate",
          onDone: [{ target: "authenticated", actions: ["setToken"] }],
          onError: [{ target: "signUpForm", actions: ["setError"] }]
        }
      },
      authenticated: {
        invoke: {
          src: "getViewer",
          onDone: [{ actions: ["setViewer", "navigateToHome"] }],
          onError: [{ actions: ["setError"] }]
        }
      }
    }
  },
  {
    actions: {
      setEmail: assign({ email: (ctx, event) => event.email }),
      setPhrase: assign({ phrase: (ctx, event) => event.data as string }),
      setViewer: assign({ viewer: (ctx, event) => event.data }),
      setToken: assign({ viewer: (ctx, event) => event.data as string }),
      setError: assign({ error: (ctx, event) => event.data as Error })
    },
    guards: {
      isAuthenticated: (_ctx, _event) => {
        const authCookie = getCookie("auth");
        return authCookie ? true : false;
      },
      hasValidEmail: (ctx, event) => !!event.email
    },
    services: {
      signInAuth: async (ctx, event) => {
        return "some-phrase-here";
      },
      signUpAuth: async (ctx, event) => {
        return "some-phrase-here";
      },
      activate: async (ctx, event) => {
        return "token";
      },
      verify: async (ctx, event) => {
        return "token";
      },
      getViewer: async (ctx, event) => {
        return { id: "akjhsdfakjhdf" };
      }
    }
  }
);

export type MachineState = StateFrom<typeof authMachine>;

export interface AuthService {
  authService: InterpreterFrom<typeof authMachine>;
}

export const AuthContext = React.createContext({} as AuthService);

export interface AuthProviderProps {
  children?: React.ReactNode | undefined;
}

export const AuthProvider: React.FC<AuthProviderProps> = (props) => {
  const router = useRouter();
  const authService = useInterpret(authMachine, {
    devTools: true,
    actions: {
      navigateToHome: (ctx, event) => {
        router.push("/");
      },
      navigateToSignIn: (ctx, event) => {
        console.log("NAVIGATE SIGN IN");
        router.push("/sign-in");
      },
      navigateToSignUp: (ctx, event) => {
        console.log("NAVIGATE SIGN UP");
        router.push("/sign-up");
      },
      navigateToActivate: (ctx, event) => {
        router.push("/activate");
      },
      navigateToVerify: (ctx, event) => {
        router.push("/verify");
      }
    }
  });

  const [state] = useActor(authService);

  console.log(state.value);

  return (
    <AuthContext.Provider value={{ authService }}>
      {props.children}
    </AuthContext.Provider>
  );
};

const isAuthenticatedSelector = (state: MachineState): boolean =>
  state.matches("authenticated");

const viewerSelector = (state: MachineState): any | null =>
  state.context.viewer;

// TODO: Add actions to sign_up/sign_in/etc.
export const useAuth = () => {
  const authService = useContext(AuthContext);
  const isAuthenticated = useSelector(
    authService.authService,
    isAuthenticatedSelector
  );
  const viewer = useSelector(authService.authService, viewerSelector);

  return {
    isAuthenticated,
    viewer,
    goToSignIn: () => authService.authService.send("GO_TO_SIGN_IN"),
    goToSignUp: () => authService.authService.send("GO_TO_SIGN_UP")
  };
};
