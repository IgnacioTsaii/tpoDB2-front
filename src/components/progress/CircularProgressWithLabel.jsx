'use client'
import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export default function CircularWithValueLabel({ value }) {
  const [progress, setProgress] = React.useState(value);

  // React.useEffect(() => {
  //   setProgress(value); // Set initial progress value

  //   const timer = setInterval(() => {
  //     setProgress((prevProgress) => {
  //       const nextProgress = prevProgress + 5;
  //       return nextProgress >= 100 ? 0 : nextProgress;
  //     });
  //   }, 800);

  //   return () => {
  //     clearInterval(timer); // Clean up timer on unmount
  //   };
  // }, [value]); // Run effect whenever value changes

  return <CircularProgressWithLabel value={progress} />;
}