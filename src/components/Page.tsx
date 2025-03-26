import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  ContainerProps,
  SxProps,
  Toolbar,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router';

const styles: Record<"loading" | "page", SxProps> = {
  page: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    height: '100vh',
    bgcolor: '#f6f6f6',
  },
  loading: {
    width: '100%',
    margin: 'auto',
    marginTop: '100px',
    alignSelf: 'center',
    textAlign: 'center',
  }
}

type PageProps = {
  title: string;
  isLoading?: boolean;
  isError?: boolean;
  error?: any;
  children: React.ReactNode;
  size?: ContainerProps['maxWidth'];
};

const ERROR = {
  message: `There was an error`
}

export function Page({ title, isLoading, isError, error = ERROR, size = 'xl', children }: PageProps) {
  const navigate = useNavigate();

  const handleClickPageName = () => {
    navigate('/')
  }

  return (
    <Box
      sx={styles.page}
    >
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={handleClickPageName} sx={{ textTransform: 'none' }}>
            <Typography variant="h5" component="div">
              {title}
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
      {isError ? <Box>{error?.message || 'There was an error'}</Box> : null}
      {isLoading ? (
        <Box
          sx={styles.loading}
        >
          <CircularProgress size="md" />
        </Box>
      ) : null}
      {!isError && !isLoading ? (
        <Container maxWidth={size} sx={{ paddingTop: '20px' }}>
          {children}
        </Container>
      ) : null}
    </Box>
  );
}
