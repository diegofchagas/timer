import styled from "styled-components";

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 3.5rem;
  }
`;

export const BaseButton = styled.button`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  color: ${({ theme }) => theme["gray-100"]};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const StartButton = styled(BaseButton)`
  background: ${({ theme }) => theme["green-500"]};

  &:not(:disabled):hover {
    background: ${({ theme }) => theme["green-700"]};
  }
`;
export const StopButton = styled(BaseButton)`
  background: ${({ theme }) => theme["red-500"]};

  &:not(:disabled):hover {
    background: ${({ theme }) => theme["red-700"]};
  }
`;
