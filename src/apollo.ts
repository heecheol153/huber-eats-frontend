import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LOCALSTORAGE_TOKEN } from "./constants";

const token = localStorage.getItem(LOCALSTORAGE_TOKEN); //token값을얻다(null)
export const isLoggedInVar = makeVar(Boolean(token)); //(null)을boolean값으로변환(false)
export const authTokenVar = makeVar(token); //token변수 makeVar를 해주고 기본값을갖는다

//각기본값을 본다.
//console.log("default value of isLoggedInVar is:", isLoggedInVar());
//console.log("default value of authToken is:", authTokenVar());

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  //console.log(headers);
  return {
    headers: {
      ...headers,
      "x-jwt": authTokenVar() || "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            },
          },
          token: {
            read() {
              //token값을읽고
              return authTokenVar(); //token값을 전달
            },
          },
        },
      },
    },
  }),
});
