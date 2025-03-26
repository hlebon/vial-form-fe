import { Page } from '@components/Page';
import {
    Box,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Tooltip,
    SxProps,
} from '@mui/material';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useQuery } from '@tanstack/react-query';
import { formsSubmissionsApi } from '@api/formSubmissions';
import { useState } from 'react';
import { Dialog } from '@components/Dialog';
import { useParams } from 'react-router';


const styles: Record<"list", SxProps> = {
    list: { display: 'flex', gap: '10px', flexDirection: 'column' }
}

function useGetFormRecords(id: string) {
    return useQuery({
        queryKey: ['forms-records', id],
        queryFn: () => formsSubmissionsApi.getRecordsById(id),
    });
}

export function FormRecords() {
    const { id } = useParams();
    const [answers, setAnswers] = useState<Record<string, string>[] | null>(null)
    const { data, isLoading, isError, error } = useGetFormRecords(id as string);

    const handleSeeAnswers = (answers: Record<string, string>[]) => {
        setAnswers(answers)
    }


    const records = data?.data || [];

    return (
        <Page title="Form Records" isLoading={isLoading} isError={isError} error={error}>
            <Box
                display="flex"
                justifyItems={'center'}
                alignItems={'center'}
                justifyContent={'space-between'}
            >
                <Typography variant='h4' sx={{ fontWeight: 700 }}>Form Records</Typography>

            </Box>
            <List sx={styles.list}>
                {records.map(({ id, answers }) => {
                    return (
                        <ListItem
                            key={id}
                            disablePadding
                            secondaryAction={
                                <Box display="flex" gap="2">
                                    <Tooltip title="Complete form">
                                        <IconButton aria-label="Complete form" onClick={() => handleSeeAnswers(answers)}>
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
                                <ListItemText primary={`custom-${id}`} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
            <Dialog title="User Response" isOpen={answers !== null} fullWidth onClose={() => {
                setAnswers(null)
            }}>
                <Box>
                    {answers?.map(({ question, answer }) => {
                        return (
                            <Box key={question}>
                                {question} : {answer}
                            </Box>
                        )
                    })}
                </Box>
            </Dialog>
        </Page>
    );
}
