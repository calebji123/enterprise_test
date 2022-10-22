/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ProfileCardProps } from "./ProfileCard";
import { CollectionProps } from "@aws-amplify/ui-react";
export declare type ProfileCardCollectionProps = React.PropsWithChildren<Partial<CollectionProps<any>> & {
    items?: any[];
    overrideItems?: (collectionItem: {
        item: any;
        index: number;
    }) => ProfileCardProps;
} & {
    overrides?: EscapeHatchProps | undefined | null;
}>;
export default function ProfileCardCollection(props: ProfileCardCollectionProps): React.ReactElement;
