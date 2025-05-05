import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, CircularProgress, FormHelperText } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn'; 
import useGovernorates from '../../hooks/useGovernorates'; 
import arrow from '../../assets/icons/cartarrow.png';
const GovernoratesDropdown = ({ setDeliveryPrice, setSelectedGovernorate }) => {
  const { governorates, loading, error } = useGovernorates();
  const [selectedGovernorateLocal, setSelectedGovernorateLocal] = useState(''); 

 
  const handleChange = (event) => {
    const selectedGov = event.target.value;
    setSelectedGovernorateLocal(selectedGov);  


    const selectedGovData = governorates.find(gov => gov.id === selectedGov);
    if (selectedGovData) {
      setDeliveryPrice(selectedGovData.delivery_price); 
    }

  
    setSelectedGovernorate(selectedGov);
  };

  if (loading) return <CircularProgress />;
  if (error) return <FormHelperText error></FormHelperText>;

  return (
    <div style={{ width: '95%' ,height:'30px'}}>
      <FormControl style={{ width: '100%', padding: '0px' }}>
        <InputLabel id="governorate-select-label" style={{ color: 'rgba(27, 53, 94, 1)' }}>اختر العنوان <img src={arrow} /></InputLabel>
        <Select
          labelId="governorate-select-label"
          value={selectedGovernorateLocal}
          onChange={handleChange}
          label="Governorate"
          sx={{
            width: '100%',
            padding: '0px',
            color: selectedGovernorateLocal ? 'rgba(27, 53, 94, 1)' : 'rgba(27, 53, 94, 1)',
            backgroundColor: selectedGovernorateLocal ? 'transparent' : 'inherit',
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '& .MuiSelect-icon': {
              display: 'none', 
            },
          }}
        >
        
          {governorates.map((gov) => (
            <MenuItem
              key={gov.id}
              value={gov.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px 4px',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center',justifyContent: 'space-between' }}>
                <LocationOnIcon style={{ marginLeft: '5px', color: 'rgba(27, 53, 94, 1)', fontSize: '14px' }} />
                <span> {gov.name}</span> 
                <span style={{ color: 'rgba(27, 53, 94, 1)', fontSize: '12px', margin: '5px' }}>
                  |
                سعر التوصيل: {gov.delivery_price}
              </span>
              <img src={arrow} />
              </span>
             
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default GovernoratesDropdown;
