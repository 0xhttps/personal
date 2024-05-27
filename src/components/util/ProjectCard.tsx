import React from 'react';
import { Card, CardContent, CardActionArea, Box, Typography } from '@mui/material';
import { IconType } from 'react-icons';
import { DiJavascript1, DiJava, DiRust, DiPython } from 'react-icons/di';
import { SiTypescript, SiSolidity } from 'react-icons/si';

interface ProjectCardProps {
  date: string;
  title: string;
  description: string;
  language: string;
  repoLink: string;
}

const getLanguageIcon = (language: string): IconType => {
  switch (language.toLowerCase()) {
    case 'javascript':
      return DiJavascript1;
    case 'typescript':
      return SiTypescript;
    case 'solidity':
      return SiSolidity;
    case 'java':
      return DiJava;
    case 'python':
      return DiPython;
    default:
      return DiRust;
  }
};

const ProjectCard: React.FC<ProjectCardProps> = ({ date, title, description, language, repoLink }) => {
  const LanguageIcon = getLanguageIcon(language);

  return (
    <Card sx={{ maxWidth: 400, height: 310, overflow: 'scroll' }}>
      <CardActionArea href={repoLink} target="_blank" sx={{ height: 310 }}>
        <Box display="flex" alignItems="center" justifyContent="center" height="100px" bgcolor="transparent">
          <LanguageIcon size="3.5em" color='#FF7F50' />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="body2" color="text.secondary" style={{ color:'#FF7F50' }} >
            <code>{date}</code>
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            <code>{title}</code>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <code>{description}</code>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProjectCard;
