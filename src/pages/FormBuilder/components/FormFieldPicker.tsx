import { Box, Button, SxProps } from '@mui/material';
import { useFormBuilderStore } from '@store/FormBuilderStore';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmailIcon from '@mui/icons-material/Email';
import PinIcon from '@mui/icons-material/Pin';
import { generateId } from '../../../helpers/generateId';

const FIELDS = [
  {
    id: generateId(),
    label: 'Text Field',
    name: 'textfield',
    icon: <TextSnippetIcon />,
    template: {
      type: 'string',
      title: 'Plain String',
    },
  },
  {
    id: generateId(),
    label: 'Number Field',
    name: 'numberfield',
    icon: <PinIcon />,
    template: {
      type: 'number',
      title: 'Plain Number',
    },
  },
  {
    id: generateId(),
    label: 'Date Field',
    name: 'datefield',
    icon: <CalendarMonthIcon />,
    template: {
      type: 'string',
      title: 'Date',
      format: 'date',
    },
  },
  {
    id: generateId(),
    label: 'Email Field',
    name: 'emailfield',
    icon: <EmailIcon />,
    template: {
      type: 'string',
      title: 'Email',
      format: 'email',
    },
  },
  {
    id: generateId(),
    label: 'Age Field',
    name: 'agefield',
    icon: <EventAvailableIcon />,
    template: {
      type: 'integer',
      title: 'Age',
    },
  },
  {
    id: generateId(),
    label: 'Phone Field',
    name: 'phonefield',
    icon: <PhoneIphoneIcon />,
    template: {
      type: 'string',
      title: 'Phone',
      pattern: '^[0-9]{10}$',
    },
  },
];

const styles: Record<'container' | 'list' | 'fieldSelector', SxProps> = {
  container: {
    height: '100%',
    bgcolor: '#ffff',
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    marginTop: '0px',
    gap: '10px',
    '&>div': {
      width: {
        xs: '100%',
        md: 'calc(50% - 5px)',
      },
    },
  },
  fieldSelector: {
    border: '1px dashed #d1d1d1',
    padding: '10px 5px',
    textAlign: 'center',
    width: '100%',
    bgcolor: 'white',
    boxShadow: '2px 8px 10px 0 rgba(180, 180, 180, 0.1)',
  },
};

export function FormFieldPicker() {
  const addAPropertyToSchema = useFormBuilderStore((state) => state.addAPropertyToSchema);
  const closeFieldPickerModal = useFormBuilderStore((state) => state.closeFieldPickerModal);
  return (
    <Box sx={styles.container}>
      <Box sx={styles.list}>
        {FIELDS.map(({ id, name, label, template, icon }) => {
          return (
            <Button
              startIcon={icon}
              variant="outlined"
              key={id}
              onClick={() => {
                addAPropertyToSchema(name, template);
                closeFieldPickerModal();
              }}
              fullWidth
              sx={{ width: 'calc((100% / 3) - 10px)' }}
            >
              {label}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
}
