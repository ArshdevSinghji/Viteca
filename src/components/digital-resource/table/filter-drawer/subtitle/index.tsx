import MultiSelect from "@/components/digital-resource/shared/multi-select";
import { Subtitle } from "@/features/digitial-resources/digital-resources.types";
import { setSelectedSubtitleLanguages } from "@/features/filter/filter.slice";
import { useAppSelector } from "@/features/hooks";
import React from "react";

const MultiSelectSubtitle = () => {
  const subtitle_languages = useAppSelector(
    (state) => state.filter.draft.subtitle_languages
  );
  const subtitle = Object.values(Subtitle);

  return (
    <MultiSelect
      label="Subtitle"
      options={subtitle}
      selectedValue={subtitle_languages}
      setSelectedValue={setSelectedSubtitleLanguages}
    />
  );
};
export default MultiSelectSubtitle;
