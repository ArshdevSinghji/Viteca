import React, { useCallback, useEffect, useRef, useState } from "react";

import styles from "./author-cell.module.scss";

import { Box, Chip, Tooltip } from "@mui/material";

const AuthorCell: React.FC<{ authors: string[] }> = ({ authors }) => {
  const [limit, setLimit] = useState<number | undefined>(undefined);
  const [allContainerDimensions, setAllContainerDimensions] = useState<
    {
      height: number;
      width: number;
    }[]
  >([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const calculateLimit = useCallback(() => {
    const limitChipHeight = 24;
    const limitChipWidth = 30;
    const maxLimitChipArea = limitChipHeight * limitChipWidth;

    const maxColumnCellWeight = 226;
    const maxContainerHeight = 56;
    const maxArea = maxColumnCellWeight * maxContainerHeight;

    const totalChips = allContainerDimensions.slice(0, authors.length);

    const n = totalChips.length;

    const totalAreaOfChips = totalChips.reduce(
      (acc, chip) => acc + chip.height * chip.width,
      0
    );

    const totalGap = n * 8;

    const limitValue = Math.floor(
      maxArea / (maxLimitChipArea + totalAreaOfChips + totalGap)
    );

    setLimit(limitValue);
  }, [allContainerDimensions, authors.length]);

  const measureChip = useCallback((element: HTMLDivElement | null) => {
    if (element) {
      setAllContainerDimensions((prev) => {
        const newDimension = {
          height: element.offsetHeight,
          width: element.offsetWidth,
        };
        return [...prev, newDimension];
      });
    }
  }, []);

  useEffect(() => {
    calculateLimit();
  }, [allContainerDimensions, calculateLimit]);

  return (
    <Box className={styles.authorsContainer}>
      <Box className={styles.authorsInnerContainer} ref={containerRef}>
        {authors.slice(0, limit).map((author: string) => (
          <Chip
            key={author}
            label={author}
            size="small"
            className={styles.chip}
            ref={measureChip}
          />
        ))}
        {typeof limit !== "undefined" && authors.length > limit && (
          <Tooltip title={authors.slice(limit).join(", ")} arrow>
            <Chip
              label={`+${authors.length - limit}`}
              size="small"
              className={styles.chip}
            />
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

export default AuthorCell;
