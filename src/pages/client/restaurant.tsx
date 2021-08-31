import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  restaurant,
  restaurantVariables,
} from "../../__generated__/restaurant";

const RESTAURANT_QUERY = gql`
  query restaurant($input: RestaurantInput!) {
    restaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
`;

interface IRestaurantParams {
  id: string;
}

//react-router-dom은 3개의hook을 준다.중요한건 useLocation,useHistory,useParams
export const Restaurant = () => {
  const params = useParams<IRestaurantParams>(); //parameters을 가져온다.
  const { loading, data } = useQuery<restaurant, restaurantVariables>(
    RESTAURANT_QUERY,
    {
      variables: {
        input: {
          restaurantId: +params.id, //(+) string->number로
        },
      },
    }
  );
  //console.log(data);
  return <h1>Restaurant</h1>;
};
