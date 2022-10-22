import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { API, Storage } from "aws-amplify";
import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  TextField,
  View,
  withAuthenticator,
  Card,
  Badge,
  StepperField,
  Divider,
} from "@aws-amplify/ui-react";
import { listListings } from "./graphql/queries";
import {
  createListing as createListingMutation,
  deleteListing as deleteListingMutation,
} from "./graphql/mutations";
import { 
  HeroLayout2,
  Homepage1,
  Navigation,
  ProductCard,
  ProductCardCollection, 
  SocialPost
} from './ui-components';



const App = ({ signOut }) => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetchListings();
  }, []);

  async function fetchListings() {
    const apiData = await API.graphql({ query: listListings });
    const listingsFromAPI = apiData.data.listListings.items;
    await Promise.all(
      listingsFromAPI.map(async (listing) => {
        if (listing.image) {
          const url = await Storage.get(listing.name);
          listing.image = url;
        }
        return listing;
      })
    );
    setListings(listingsFromAPI);
  }

  async function createListing(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const image = form.get("image");
    const data = {
      name: form.get("name"),
      description: form.get("description"),
      price: form.get("price"),
      image: image.name,
    };
    if (!!data.image) await Storage.put(data.name, image);
    await API.graphql({
      query: createListingMutation,
      variables: { input: data },
    });
    fetchListings();
    event.target.reset();
  }

  async function deleteListing({ id, name }) {
    const newListings = listings.filter((listing) => listing.id !== id);
    setListings(newListings);
    await Storage.remove(name);
    await API.graphql({
      query: deleteListingMutation,
      variables: { input: { id } },
    });
  }

  return (
    <View className="App">
      <Navigation />
      <Homepage1 />
      <Divider />
      <View as="form" margin="3rem 0" onSubmit={createListing}>
        <Flex direction="column" justifyContent="center" alignItems="center">
          <TextField
            name="name"
            placeholder="Listing Name"
            label="Listing Name"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="description"
            placeholder="Listing Description"
            label="Listing Description"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="price"
            placeholder="Listing Price"
            label="Listing Price"
            labelHidden
            variation="quiet"
            required
          />
          <View
            name="image"
            as="input"
            type="file"
            style={{ border:"solid black 1px" }}
          />
          <Button type="submit" variation="primary">
            Create Listing
          </Button>
        </Flex>
      </View>
      <Divider />
      <View margin="3rem 0" className="listing_view">
      <ProductCardCollection />
      </View>
      {/* <Button onClick={signOut}>Sign Out</Button> */}
    </View>
  );
};

export default App;


 {/* <Flex
          key={listing.id || listing.name}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Text as="strong" fontWeight={700}>
            {listing.name}
          </Text>
          <Text as="span">{listing.description}</Text>
          {listing.image && (
            <Image
              src={listing.image}
              alt={`visual aid for ${listings.name}`}
              style={{ width: 400 }}
            />
          )}
          <Text as="span">{listing.price}</Text>
          <Button variation="link" onClick={() => deleteListing(listing)}>
            Delete listing
          </Button>
        </Flex> */}
