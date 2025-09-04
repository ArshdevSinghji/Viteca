import MultiSelectInfiniteScroll from "@/components/digital-resource/shared/multi-select/multi-select-infinite-scroll";
import { setSelectedAuthors } from "@/features/filter/filter.slice";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import React from "react";

const MultiSelectAuthorInfiniteScroll = () => {
  const dispatch = useAppDispatch();
  const { data, total } = useAppSelector((state) => state.speaker);
  const { authors } = useAppSelector((state) => state.filter.draft);

  const onChange = (option: { key: string; value: string }) => {
    // Check if author is already selected to avoid duplicates
    if (!authors?.includes(option.value)) {
      dispatch(setSelectedAuthors([...(authors ?? []), option.value]));
    }
  };

  const onDelete = (authorName: string) => {
    dispatch(
      setSelectedAuthors(authors?.filter((author) => author !== authorName))
    );
  };

  return (
    <MultiSelectInfiniteScroll
      value={authors}
      label="Author"
      multiple={true}
      searchPlaceholder="Search authors..."
      noOptionsText="No authors found"
      options={data}
      totalOptions={total}
      onChange={onChange}
      onDelete={onDelete}
    />
  );
};

export default MultiSelectAuthorInfiniteScroll;
