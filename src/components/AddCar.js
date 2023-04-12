import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddCar(props) {
    const [car, setCar] = React.useState({
        brand:'',
        model:'',
        color:'',
        fuel:'',
        year:'',
        price:''
    })

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (reason !== 'backdropClick') {
    setOpen(false);
  }
  };

  const handleSave = () => {
    props.addCar(car);
    setOpen(false);
    setCar({
    brand:'',
    model:'',
    color:'',
    fuel:'',
    year:'',
    price:''})
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        New Car
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Car</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Brand"
            value={car.brand}
            fullWidth // leveys
            variant="standard"
            onChange={e =>setCar({...car, brand: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Model"
            value={car.model}
            fullWidth // leveys
            variant="standard"
            onChange={e =>setCar({...car, model: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Color"
            value={car.color}
            fullWidth // leveys
            variant="standard"
            onChange={e =>setCar({...car, color: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Fuel"
            value={car.fuel}
            fullWidth // leveys
            variant="standard"
            onChange={e =>setCar({...car, fuel: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Year"
            value={car.year}
            fullWidth // leveys
            variant="standard"
            onChange={e =>setCar({...car, year: e.target.value})}
          />
          <TextField
            margin="dense"
            label="Price"
            value={car.price}
            fullWidth // leveys
            variant="standard"
            onChange={e =>setCar({...car, price: e.target.value})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}