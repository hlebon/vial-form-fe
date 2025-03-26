import { JSX, useState } from 'react';
import { IconButton, Box, Typography, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormBuilderStore } from '@store/FormBuilderStore';
import { ObjectFieldTemplateProps } from '@rjsf/utils';

type ObjectFieldTemplateItemProps = {
  name: string;
  onEdit: () => void;
  onDelete?: () => void;
  content: JSX.Element;
};

function ObjectFieldTemplateItem({
  name,
  onEdit,
  onDelete,
  content,
}: ObjectFieldTemplateItemProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <Box
      key={name}
      className="property-wrapper"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{ position: 'relative', paddingRight: '40px' }}
    >
      {content}
      {hovered && (
        <Box
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <IconButton size="small" onClick={onEdit}>
            <EditIcon fontSize="small" sx={{ color: "primary.light" }} />
          </IconButton>
          {onDelete && (
            <IconButton size="small" onClick={onDelete}>
              <DeleteIcon fontSize="small" sx={{ color: "primary.light" }} />
            </IconButton>
          )}
        </Box>
      )}
    </Box>
  );
}

export function ObjectFieldTemplate(props: ObjectFieldTemplateProps) {
  const [title, setTitle] = useState<string | undefined>(undefined);

  const deleteField = useFormBuilderStore((state) => state.deletePropertyFromSchema);
  const openFieldEditorModal = useFormBuilderStore((state) => state.openFieldEditorModal);
  const editFormTitle = useFormBuilderStore((state) => state.editFormTitle);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, border: "1px solid #dddddd", boxShadow: "2px 4px 8px #dddddd" }}>
      <Box sx={{ bgcolor: "#eeeeee", borderBottom: "1px solid #dddddd", padding: "20px", pb: 2, width: "100%", display: "flex", flexDirection: "column" }}>
        {Boolean(props.title) === false || title ? (
          <TextField
            variant='outlined'
            name=""
            label="Update title text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                editFormTitle(title || props.title);
                setTitle(undefined);
              }
            }}
          />
        ) : (
          <Typography
            variant="h4"
            onClick={() => setTitle(props.title)}
            sx={{
              cursor: 'pointer',
              borderBottomWidth: "1px",
              borderBottomStyle: 'dashed',
              borderBottomColor: "transparent",
              '&:hover': {
                borderColor: 'gray'
              },
            }}
          >
            {props.title}
          </Typography>
        )}

        {props.description && <Typography>{props.description}</Typography>}
      </Box>

      {props.properties.length === 0 ? <Box sx={{ margin: "20px", border: "1px dashed gray", padding: "30px 0", textAlign: "center" }}>
        <Typography variant='h4'>
          Start Building!
        </Typography>
      </Box> : null}
      <Box paddingX="20px" paddingBottom="30px" pt="0px" sx={{ display: 'flex', flexDirection: "column", gap: 3 }}>
        {props.properties.map((element) => {
          return (
            <ObjectFieldTemplateItem
              key={element.name}
              name={element.name}
              content={element.content}
              onEdit={() => {
                openFieldEditorModal(element.name);
              }}
              onDelete={() => deleteField(element.name)}
            />
          );
        })}
      </Box>
    </Box>
  );
}
