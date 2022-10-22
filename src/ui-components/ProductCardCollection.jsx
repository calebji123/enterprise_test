/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { SortDirection } from "@aws-amplify/datastore";
import { Listing } from "../models";
import {
  getOverrideProps,
  useDataStoreBinding,
} from "@aws-amplify/ui-react/internal";
import ProductCard from "./ProductCard";
import { Collection } from "@aws-amplify/ui-react";
export default function ProductCardCollection(props) {
  const { items: itemsProp, overrideItems, overrides, ...rest } = props;
  const itemsPagination = {
    sort: (s) => s.createdAt(SortDirection.DESCENDING),
  };
  const itemsDataStore = useDataStoreBinding({
    type: "collection",
    model: Listing,
    pagination: itemsPagination,
  }).items;
  const items = itemsProp !== undefined ? itemsProp : itemsDataStore;
  return (
    <Collection
      type="list"
      isSearchable={true}
      isPaginated={true}
      searchPlaceholder="Search..."
      itemsPerPage={6}
      direction="column"
      alignItems="stretch"
      justifyContent="left"
      items={items || []}
      {...rest}
      {...getOverrideProps(overrides, "ProductCardCollection")}
    >
      {(item, index) => (
        <ProductCard
          listing={item}
          key={item.id}
          {...(overrideItems && overrideItems({ item, index }))}
        ></ProductCard>
      )}
    </Collection>
  );
}
