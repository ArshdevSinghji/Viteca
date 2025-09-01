import MultiSelectInfiniteScroll from "@/components/digital-resource/shared/multi-select/multi-select-infinite-scroll";
import { setSelectedAuthors } from "@/features/filter/filter.slice";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import React from "react";

const MultiSelectAuthorInfiniteScroll = () => {
  const dispatch = useAppDispatch();
  const { data, count } = useAppSelector((state) => state.speaker);
  const { authors } = useAppSelector((state) => state.filter.draft);

  const onChange = (option: (typeof data)[0]) => {
    const newOption = option.first_name + " " + option.last_name;
    dispatch(setSelectedAuthors([...(authors ?? []), newOption]));
  };

  const onDelete = (option: (typeof data)[0]) => {
    const newOption = option.first_name + " " + option.last_name;
    dispatch(
      setSelectedAuthors(authors?.filter((author) => author !== newOption))
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
      totalOptions={count}
      onChange={onChange}
      onDelete={onDelete}
    />
  );
};

export default MultiSelectAuthorInfiniteScroll;
