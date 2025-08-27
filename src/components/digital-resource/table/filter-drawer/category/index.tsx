import MultiSelect from "@/components/digital-resource/shared/multi-select";
import { setSelectedCategory } from "@/features/filter/filter.slice";
import { useAppSelector } from "@/features/hooks";
import React from "react";

const category = [
  {
    key: "Course Presentation",
    value: "Course Presentation",
  },
  {
    key: "Program Presentation",
    value: "Program Presentation",
  },
  {
    key: "Advanced Course",
    value: "Advanced Course",
  },
  {
    key: "Basic Training",
    value: "Basic Training",
  },
];

const MultiSelectCategory: React.FC<{
  show: boolean;
  anchorEl: any;
  handleMouseEnter: (e: any, param: string) => void;
  handleMouseLeave: (param: string) => void;
}> = ({ show, anchorEl, handleMouseEnter, handleMouseLeave }) => {
  const selectedCategory = useAppSelector(
    (state) => state.filter.selectedCategory
  );
  return (
    <MultiSelect
      label="Category"
      options={category}
      selectedValue={selectedCategory}
      setSelectedValue={setSelectedCategory}
      show={show}
      anchorEl={anchorEl}
      handleMouseEnter={handleMouseEnter}
      handleMouseLeave={handleMouseLeave}
    />
  );
};

export default MultiSelectCategory;
