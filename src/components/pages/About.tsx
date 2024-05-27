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
      repoLink: 'https://github.com/0xhttps/discord-price-bot',
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
        <Typography variant="h2" gutterBottom>
          <code>/about</code>
        </Typography>       
        <Box>
          <p>
            Hey! 
            <br/><br/>
            My name is Michael. 
            <br/><br/>
            I am 23, living in the PNW. Much of my time is spent learning and creating various things both at work, and at home.
            Recently, I have taken up React as a hobby, which is why you are seeing this :P
            <br/>
            My goal here is to continue adding onto this as time goes on, showcasing both things I am learning currently, and projects I have done in the past.
            <br/><br/>
            Below, you can find some of my favorite projects. I have learned pretty much everything I know (dev wise) working with/in crypto, which you'll notice by the common theme of the projects.
            Anyways, thanks for taking the time to read this. Have a nice day :)
          </p>
        </Box>
        <Box>
        <Typography variant="h5" paddingTop="20px" paddingBottom="20px">
        <code>My Projects</code>
        </Typography>
        <Grid container spacing={2}>
          {projects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
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
