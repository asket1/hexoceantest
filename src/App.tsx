import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, MenuItem } from '@mui/material';
import axios, { AxiosError, AxiosResponse } from 'axios';

import './index.scss';

function App(): JSX.Element {
  const [name, setName] = useState<string>('');
  const [preparationTime, setPreparationTime] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [noOfSlices, setNoOfSlices] = useState<string>('');
  const [diameter, setDiameter] = useState<string>('');
  const [spicinessScale, setSpicinessScale] = useState<string>('');
  const [slicesOfBread, setSlicesOfBread] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const resetForm = (): void => {
    setName('');
    setPreparationTime('');
    setType('');
    setNoOfSlices('');
    setDiameter('');
    setSpicinessScale('');
    setSlicesOfBread('');
    setSuccess(false);
    setError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const dishData = {
      name,
      preparation_time: preparationTime,
      type,
      no_of_slices: type === 'pizza' ? noOfSlices : undefined,
      diameter: type === 'pizza' ? diameter : undefined,
      spiciness_scale: type === 'soup' ? spicinessScale : undefined,
      slices_of_bread: type === 'sandwich' ? slicesOfBread : undefined,
    };
    // console.log('from FE: ', JSON.stringify(dishData));
    try {
      axios
        .post<string>('https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/', dishData)
        .then((response: AxiosResponse<string>) => {
          console.log('response: ', response.data);
          setSuccess(true);
          setTimeout(resetForm, 1500);
        })
        .catch((error: AxiosError<string>) => {
          console.warn('error: ', error.response?.data);
          setError(true);
        });
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          inputProps={{ minlength: '3' }}
          onChange={(event) => setName(event.target.value)}
          required
          fullWidth
        />

        <TextField
          label="Preparation Time"
          type="time"
          value={preparationTime}
          inputProps={{ step: '1' }}
          InputLabelProps={{ shrink: true }}
          onChange={(event) => setPreparationTime(event.target.value)}
          required
          fullWidth
        />

        <TextField
          select
          label="Type"
          value={type}
          onChange={(event) => {
            setType(event.target.value);
          }}
          fullWidth
          required
        >
          <MenuItem value="">Select a dish type</MenuItem>
          <MenuItem value="pizza">Pizza</MenuItem>
          <MenuItem value="soup">Soup</MenuItem>
          <MenuItem value="sandwich">Sandwich</MenuItem>
        </TextField>

        {type === 'pizza' && (
          <>
            <TextField
              label="Number of Slices"
              type="number"
              inputProps={{ inputMode: 'numeric', min: '1', max: '10', step: '1' }}
              value={noOfSlices}
              onChange={(event) => setNoOfSlices(event.target.value)}
              required
              fullWidth
            />

            <TextField
              label="Diameter"
              type="number"
              inputProps={{ inputMode: 'numeric', min: '1', max: '80', step: '0.1' }}
              value={diameter}
              onChange={(event) => setDiameter(event.target.value)}
              required
              fullWidth
            />
          </>
        )}
        {type === 'soup' && (
          <>
            <TextField
              label="Spiciness Scale"
              type="number"
              inputProps={{ inputMode: 'numeric', min: '1', max: '10', step: '1' }}
              value={spicinessScale}
              onChange={(event) => setSpicinessScale(event.target.value)}
              required
              fullWidth
            />
          </>
        )}
        {type === 'sandwich' && (
          <>
            <TextField
              label="Slices of Bread"
              type="number"
              inputProps={{ inputMode: 'numeric', min: '1', max: '20', step: '1' }}
              value={slicesOfBread}
              onChange={(event) => setSlicesOfBread(event.target.value)}
              required
              fullWidth
            />
          </>
        )}

        <Button type="submit" variant="contained" color="primary">
          Add dish
        </Button>

        {success && <p className="success">Success! Your dish has been added.</p>}
        {error && <p className="error">Something went wrong.</p>}
      </form>
    </div>
  );
}

export default App;
