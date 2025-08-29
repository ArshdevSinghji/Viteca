import MultiSelectInfiniteScroll from "@/components/digital-resource/shared/multi-select/multi-select-infinite-scroll";
import { setSelectedSubject } from "@/features/filter/filter.slice";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import React from "react";

const MultiSelectSubjectInfiniteScroll = () => {
  const dispatch = useAppDispatch();
  const { data, count } = useAppSelector((state) => state.speaker);
  const { subjects } = useAppSelector((state) => state.filter);

  const onChange = (option: string) => {
    const newSubject = subjects ? [...subjects, option] : [option];
    dispatch(setSelectedSubject(newSubject));
  };

  const onDelete = (option: string) => {
    const newSubject = subjects?.filter((subject) => subject !== option);
    dispatch(setSelectedSubject(newSubject));
  };

  return (
    <MultiSelectInfiniteScroll
      value={subjects}
      label="Subject"
      multiple={false}
      options={data}
      totalOptions={count}
      onChange={onChange}
      onDelete={onDelete}
    />
  );
};

export default MultiSelectSubjectInfiniteScroll;
