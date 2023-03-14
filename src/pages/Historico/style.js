import styled from 'styled-components';

export const Container = styled.div`
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  background-color:#202024;
  color: white;
  font-family: 'Roboto';

  h1{
    font-size: 1.5rem;
    font-family: 'Roboto';  
    line-height: 160%;
    color: #E1E1E6;
  }
`;


export const ContainerTable = styled.div`
  overflow: auto;
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background-color: #323238;
      padding: 1rem;
      text-align: left;
      color: #E1E1E6;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }
      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color:#29292E;
      border-top: #202024;
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }
      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }`

  export const Status = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: ${({color}) => color};
  };
  `