import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { Dish } from "../../components/dish";
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
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
        menu {
          ...DishParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`;

interface IRestaurantParams {
  id: string;
}

// react-router-dom은 3개의hook을 준다.중요한건 useLocation,useHistory,useParams
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
  console.log(data);
  return (
    <div>
      <Helmet>
        <title>{data?.restaurant.restaurant?.name || ""} | Huber Eats</title>
      </Helmet>
      <div
        className=" bg-gray-800 bg-center bg-cover py-48"
        style={{
          backgroundImage: `url(${data?.restaurant.restaurant?.coverImg})`,
        }}
      >
        <div className="bg-white w-3/12 py-8 pl-48">
          <h4 className="text-4xl mb-3">{data?.restaurant.restaurant?.name}</h4>
          <h5 className="text-sm font-light mb-2">
            {data?.restaurant.restaurant?.category?.name}
          </h5>
          <h6 className="text-sm font-light">
            {data?.restaurant.restaurant?.address}
          </h6>
        </div>
      </div>
      <div>
        {data?.restaurant.restaurant?.menu.map((dish, index) => (
          <Dish
            key={index}
            name={dish.name}
            description={dish.description}
            price={dish.price}
            isCustomer={true}
            options={dish.options}
          />
        ))}
      </div>
    </div>
  );
};
