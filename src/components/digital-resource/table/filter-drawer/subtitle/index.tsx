import MultiSelect from "@/components/digital-resource/shared/multi-select";
import { setSelectedSubtitleLanguages } from "@/features/filter/filter.slice";
import { useAppSelector } from "@/features/hooks";
import React from "react";

const subtitle = [
  { key: "en", value: "English" },
  { key: "es", value: "Spanish" },
  { key: "fr", value: "French" },
];

const MultiSelectSubtitle: React.FC<{
  show: boolean;
  anchorEl: any;
  handleMouseEnter: (e: any, param: string) => void;
  handleMouseLeave: (param: string) => void;
}> = ({ show, anchorEl, handleMouseEnter, handleMouseLeave }) => {
  const selectedSubtitle = useAppSelector(
    (state) => state.filter.selectedSubtitleLanguages
  );
  return (
    <MultiSelect
      label="Subtitle"
      options={subtitle}
      selectedValue={selectedSubtitle}
      setSelectedValue={setSelectedSubtitleLanguages}
      show={show}
      anchorEl={anchorEl}
      handleMouseEnter={handleMouseEnter}
      handleMouseLeave={handleMouseLeave}
    />
  );
};
export default MultiSelectSubtitle;
