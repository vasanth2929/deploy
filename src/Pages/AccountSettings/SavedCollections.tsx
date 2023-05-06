import { groupBy } from "lodash";
import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { SavedCollection } from "../../Components/SaveCollection";
import { AppLoader } from "../../Components/Shared/Loader";
import { getSavedCollections } from "../../services/user.services";

export const SavedCollections = () => {
  const { data, isLoading } = useQuery(
    ["get-saved-collections"],
    getSavedCollections,
    {
      select: (d) => d.data,
    }
  );

  const { photos = [], isEmpty } = useMemo(() => {
    if (isLoading) return { photos: [], isEmpty: true };
    const savedCollections = data["savedCollections"];
    const groupedCollections = groupBy(savedCollections, "type");
    const photos = groupedCollections["Photo"]?.slice(0, 3) || [];

    return {
      photos,
      isEmpty: !Boolean(savedCollections?.length),
    };
  }, [data]);
  if (isLoading) {
    return <AppLoader />;
  }
  if (isEmpty) return <>Empty</>;
  return (
    <div className="grid grid-cols-3 gap-5">
      <SavedCollection label="Photos" data={photos} />
      {/* <SavedCollection /> */}
    </div>
  );
};
