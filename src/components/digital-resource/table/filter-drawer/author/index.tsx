import MultiSelect from "@/components/digital-resource/shared/multi-select";
import { setSelectedAuthors } from "@/features/filter/filter.slice";
import { useAppSelector } from "@/features/hooks";
import React from "react";

const author = [
  {
    key: "John Doe",
    value: "John Doe",
  },
  {
    key: "Jane Smith",
    value: "Jane Smith",
  },
  {
    key: "Emily Johnson",
    value: "Emily Johnson",
  },
  {
    key: "Michael Brown",
    value: "Michael Brown",
  },
];

const MultiSelectAuthor: React.FC<{
  show: boolean;
  anchorEl: any;
  handleMouseEnter: (e: any, param: string) => void;
  handleMouseLeave: (param: string) => void;
}> = ({ show, anchorEl, handleMouseEnter, handleMouseLeave }) => {
  const selectedAuthors = useAppSelector(
    (state) => state.filter.selectedAuthors
  );
  return (
    <MultiSelect
      label="Author"
      options={author}
      selectedValue={selectedAuthors}
      setSelectedValue={setSelectedAuthors}
      show={show}
      anchorEl={anchorEl}
      handleMouseEnter={handleMouseEnter}
      handleMouseLeave={handleMouseLeave}
    />
  );
};

export default MultiSelectAuthor;
