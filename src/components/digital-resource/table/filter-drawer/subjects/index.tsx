import MultiSelectInfiniteScroll from "@/components/digital-resource/shared/multi-select/multi-select-infinite-scroll";
import { setSelectedSubject } from "@/features/filter/filter.slice";
import { FilterType } from "@/features/filter/filter.types";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import React from "react";

const Subject = [
  {
    key: "subject1",
    value: "S001",
  },
  {
    key: "subject2",
    value: "S002",
  },
  {
    key: "subject3",
    value: "S003",
  },
  {
    key: "subject4",
    value: "S004",
  },
  {
    key: "subject5",
    value: "S005",
  },
  {
    key: "subject6",
    value: "S006",
  },
  {
    key: "subject7",
    value: "S007",
  },
  {
    key: "subject8",
    value: "S008",
  },
  {
    key: "subject9",
    value: "S009",
  },
  {
    key: "subject10",
    value: "S010",
  },
];

const MultiSelectSubjectInfiniteScroll = () => {
  let { selectedSubject } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();

  const [subject, setSubject] = React.useState(Subject.slice(0, 5));

  const onChange = (option: FilterType) => {
    if (selectedSubject?.value !== option.value) {
      selectedSubject = option;
      dispatch(setSelectedSubject(selectedSubject));
    }
  };

  const onDelete = (option: FilterType) => {
    if (selectedSubject?.value === option.value) {
      selectedSubject = null;
      dispatch(setSelectedSubject(selectedSubject));
    }
  };

  const fetchMoreSubject = () => {
    if (subject.length < Subject.length) {
      setSubject((prev) => [
        ...prev,
        ...Subject.slice(prev.length, prev.length + 2),
      ]);
    }
  };

  return (
    <MultiSelectInfiniteScroll
      value={selectedSubject}
      label="Subject"
      multiple={false}
      options={subject}
      totalOptions={Subject.length}
      loadMore={fetchMoreSubject}
      onChange={onChange}
      onDelete={onDelete}
    />
  );
};

export default MultiSelectSubjectInfiniteScroll;
