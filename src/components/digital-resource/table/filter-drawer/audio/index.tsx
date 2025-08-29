import MultiSelect from "@/components/digital-resource/shared/multi-select";
import { Language } from "@/features/digitial-resources/digital-resources.types";
import { setSelectedAudioLanguages } from "@/features/filter/filter.slice";
import { useAppSelector } from "@/features/hooks";
import React from "react";

const MultiSelectAudioInfiniteScroll = () => {
  const { audio_languages } = useAppSelector((state) => state.filter);

  const audio = Object.values(Language);

  return (
    <MultiSelect
      label="Audio Languages"
      options={audio}
      selectedValue={audio_languages}
      setSelectedValue={setSelectedAudioLanguages}
    />
  );
};

export default MultiSelectAudioInfiniteScroll;
