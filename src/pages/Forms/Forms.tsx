import { Page } from '@components/Page';
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Tooltip,
  SxProps
} from '@mui/material';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { formsApi } from '@api/forms';


const styles: Record<"list", SxProps> = {
  list: { display: 'flex', gap: '10px', flexDirection: 'column' }
}

function useGetForm() {
  return useQuery({
    queryKey: ['forms'],
    queryFn: formsApi.getForms,
  });
}

export function Forms() {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetForm();

  const handleGoToFormBuilder = () => {
    navigate('/form-builder');
  };

  const handlePlayForm = (id: string) => {
    navigate(`/form-preview/${id}`);
  };

  const handleGoToRecords = (id: string) => {
    navigate(`/form-records/${id}`)
  }

  const forms = data?.data || [];

  return (
    <Page title="My Forms" isLoading={isLoading} isError={isError} error={error}>
      <Box
        display="flex"
        justifyItems={'center'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Typography variant='h4' sx={{ fontWeight: 700 }}>Forms</Typography>
        <Button variant="outlined" onClick={handleGoToFormBuilder} startIcon={<AddIcon />} sx={{ borderWidth: `2px` }}>
          Create Form
        </Button>
      </Box>

      <List sx={styles.list}>
        {forms.map(({ id, name }) => {
          return (
            <ListItem
              key={id}
              disablePadding
              secondaryAction={
                <Box display="flex" gap="2">

                  <Tooltip title="See form submissions">
                    <IconButton aria-label="See form submissions" onClick={() => handleGoToRecords(id)}>
                      <ChecklistOutlinedIcon color='primary' />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Complete form">
                    <IconButton aria-label="Complete form" onClick={() => handlePlayForm(id)}>
                      <PlayArrowIcon color='primary' />
                    </IconButton>
                  </Tooltip>
                </Box>

              }
            >
              <ListItemButton
                color='primary'
                divider
                sx={{ width: '100%' }}
              >
                <ListItemIcon>
                  <ArticleOutlinedIcon sx={{ color: 'primary.light' }} />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Page>
  );
}
