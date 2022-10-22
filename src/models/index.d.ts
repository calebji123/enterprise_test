import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type ListingMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerListing = {
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly price?: number | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyListing = {
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly price?: number | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Listing = LazyLoading extends LazyLoadingDisabled ? EagerListing : LazyListing

export declare const Listing: (new (init: ModelInit<Listing, ListingMetaData>) => Listing) & {
  copyOf(source: Listing, mutator: (draft: MutableModel<Listing, ListingMetaData>) => MutableModel<Listing, ListingMetaData> | void): Listing;
}