import React from 'react';
import PageWrapper from '../util/PageWrapper';
import { Box, Typography, Grid } from '@mui/material';
import ProjectCard from '../util/ProjectCard';

const About: React.FC = () => {
  const projects = [
    {
      title: 'Crypto API',
      date: 'November, 2023',
      description: 'Had no idea how APIs worked before this. API hosted on Vercel to retrieve various information.',
      repoLink: 'https://github.com/0xhttps/api',
      language: 'javascript'
    },
    {
      title: 'Discord Price Bot (TS)',
      date: 'November, 2023',
      description: 'Ran this on a Raspberry Pi for months. Displays a crypto price as the bots username, updating frequently.',
      repoLink: 'https://github.com/0xhttps/discord-price-bot',
      language: 'typescript'
    },
    {
      title: 'Discord Price Bot (Python)',
      date: 'January, 2024',
      description: 'Migrated the TypeScript bot to Python to improve speed and overall ease of use. Python is much better at this stuff!',
      repoLink: 'https://github.com/0xhttps/python-price-bot',
      language: 'python'
    },
    {
      title: 'Buildable ERC1155',
      date: 'April, 2022',
      description: 'NFT Contract that allows for token creation after depoloyment. Used to create a token for a group of friends.',
      repoLink: 'https://github.com/0xhttps/buildable-erc1155-nft',
      language: 'solidity'
    },
    {
      title: 'Dynamically Priced ERC721',
      date: 'March, 2024',
      description: 'ERC721 NFT contract that allows for minting with ERC20 tokens. Price of mint changes based on Uniswap v3 pool price.',
      repoLink: 'https://github.com/0xhttps/dynamic-price-nft-mint',
      language: 'solidity'
    },
    {
      title: 'Vanity Contract Address',
      date: 'July, 2022',
      description: 'Generate a vanity contract address using Java (the first language I learned). I never touch Java anymore lol.',
      repoLink: 'https://github.com/0xhttps/web3j',
      language: 'java'
    },
  ];
  return (
    <PageWrapper>
        <Typography variant="h2">
          <code>/about</code>
        </Typography>
        <Box>
        <Typography variant="h5" paddingTop="20px" paddingBottom="20px">
        <code>Hi</code>
        </Typography>
          <p>
            I'm Michael. I like to make things.
            <br/><br/>
            My main goal with this website is to learn more web stuff. I will continue adding features as they come to me (likely random useless features lol).
            <br/><br/>
            Below, you can find some past projects of mine.
          </p>
        </Box>
        <Box>
        <Typography variant="h5" paddingTop="20px" paddingBottom="20px">
        <code>My Projects</code>
        </Typography>
        <Grid container spacing={2} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch' }}>
          {projects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} style={{ display: 'flex' }}>
              <ProjectCard
                language={project.language}
                date={project.date}
                title={project.title}
                description={project.description}
                repoLink={project.repoLink}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

    </PageWrapper>
  );
};

export default About;
