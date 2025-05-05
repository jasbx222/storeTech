import React from 'react';
import { Box, Skeleton, Stack } from '@mui/material';

const SkeletonLoader = ({
  type = 'card',
  count = 3,
  height = 150,
  width = '100%',
  spacing = 2
}) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'text':
        return [...Array(count)].map((_, i) => (
          <Skeleton key={i} variant="text" height={30} width="80%" />
        ));
      case 'circle':
        return [...Array(count)].map((_, i) => (
          <Skeleton key={i} variant="circular" width={60} height={60} />
        ));
      case 'card':
      default:
        return [...Array(count)].map((_, i) => (
          <Box key={i} sx={{ border: '1px solid #eee', borderRadius: 2, p: 2 }}>
            <Skeleton variant="rectangular" width={width} height={height} />
            <Skeleton variant="text" width="60%" sx={{ mt: 1 }} />
            <Skeleton variant="text" width="40%" />
          </Box>
        ));
    }
  };

  return (
    <Stack spacing={spacing}>
      {renderSkeleton()}
    </Stack>
  );
};

export default SkeletonLoader;
