import React from 'react';
import styled from 'styled-components';

const DescriptionContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 40%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 40px;
  box-sizing: border-box;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h2`
  font-size: 2.5em;
  color: #2c3e50;
  margin-bottom: 20px;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
`;

const Description = styled.p`
  font-size: 1.1em;
  line-height: 1.6;
  color: #34495e;
  margin-bottom: 20px;
`;

const BackButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 5px;
  align-self: flex-start;

  &:hover {
    background-color: #2980b9;
  }
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Icon = styled.span`
  font-size: 1.5em;
  margin-right: 10px;
  color: #3498db;
`;

function IslandDescription({ island, onBackClick }) {
  const getIslandDescription = (islandName) => {
    switch (islandName) {
      case 'Island 1':
        return "A tropical paradise with pristine beaches and lush rainforests. Home to exotic wildlife and hidden waterfalls.";
      case 'Island 2':
        return "A volcanic wonder with black sand beaches and hot springs. Perfect for adventurers and nature enthusiasts.";
      case 'Island 3':
        return "A cultural gem with ancient ruins and vibrant local traditions. Explore the rich history and unique cuisine.";
      case 'Island 4':
        return "A diver's dream with colorful coral reefs and diverse marine life. Ideal for underwater photography and relaxation.";
      case 'Island 5':
        return "An eco-friendly retreat with sustainable resorts and untouched wilderness. Experience harmony with nature.";
      default:
        return "Discover the unique charm and beauty of this island paradise.";
    }
  };

  return (
    <DescriptionContainer>
      <div>
        <Title>{island}</Title>
        <Description>{getIslandDescription(island)}</Description>
        <Feature>
          <Icon>🌴</Icon>
          <span>Tropical climate</span>
        </Feature>
        <Feature>
          <Icon>🏖️</Icon>
          <span>Beautiful beaches</span>
        </Feature>
        <Feature>
          <Icon>🍹</Icon>
          <span>Local cuisine</span>
        </Feature>
      </div>
      <BackButton onClick={onBackClick}>Back to Overview</BackButton>
    </DescriptionContainer>
  );
}

export default IslandDescription;