import MultiSelect from "@/components/digital-resource/shared/multi-select";
import MultiSelectInfiniteScroll from "@/components/digital-resource/shared/multi-select/multi-select-infinite-scroll";
import { setSelectedAudioLanguages } from "@/features/filter/filter.slice";
import { FilterType } from "@/features/filter/filter.types";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import React from "react";

const Audio = [
  {
    key: "English",
    value: "en",
  },
  {
    key: "Spanish",
    value: "es",
  },
  {
    key: "French",
    value: "fr",
  },
  {
    key: "German",
    value: "de",
  },
  {
    key: "Chinese",
    value: "zh",
  },
  {
    key: "Japanese",
    value: "ja",
  },
  {
    key: "Russian",
    value: "ru",
  },
  {
    key: "Arabic",
    value: "ar",
  },
  {
    key: "Portuguese",
    value: "pt",
  },
  {
    key: "Italian",
    value: "it",
  },
  {
    key: "Korean",
    value: "ko",
  },
  {
    key: "Hindi",
    value: "hi",
  },
];

const MultiSelectAudioInfiniteScroll = () => {
  let { selectedAudioLanguages } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();

  const [audio, setAudio] = React.useState(Audio.slice(0, 5));

  const onChange = (option: FilterType) => {
    if (selectedAudioLanguages?.value !== option.value) {
      selectedAudioLanguages = option;
      dispatch(setSelectedAudioLanguages(selectedAudioLanguages));
    }
  };

  const onDelete = (option: FilterType) => {
    if (selectedAudioLanguages?.value === option.value) {
      selectedAudioLanguages = null;
      dispatch(setSelectedAudioLanguages(selectedAudioLanguages));
    }
  };

  const fetchMoreAudio = () => {
    if (audio.length < Audio.length) {
      setAudio((prev) => [
        ...prev,
        ...Audio.slice(prev.length, prev.length + 2),
      ]);
    }
  };

  return (
    <MultiSelectInfiniteScroll
      value={selectedAudioLanguages}
      label="Audio Languages"
      multiple={false}
      options={audio}
      totalOptions={Audio.length}
      loadMore={fetchMoreAudio}
      onChange={onChange}
      onDelete={onDelete}
    />
  );
};

export default MultiSelectAudioInfiniteScroll;
