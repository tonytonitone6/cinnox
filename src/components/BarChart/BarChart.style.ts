import styled from '@emotion/styled';

type BarPercentageType = {
  value: number;
};

export const BarChartContainer = styled('div')`
  width: 100%;
  height: 100%;
  display: block;
  position: relative;
`;

export const MetricPoint = styled('ul')`
  color: gray;
  margin: 0;
  padding: 0;
  width: 50px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;

  & li {
    list-style: none;
    position: relative;
  }

  & span {
    font-size: 12px;
    font-weight: 600;
    position: absolute;
    bottom: 0;
    right: 10px;
  }
`;

export const Bar = styled('div')<BarPercentageType>`
  display: flex;
  position: relative;
  background-color: #003399;
  width: 50px;
  height: ${({ value }) => value}%;
  position: absolute;
  bottom: 0;
  justify-content: center;

  & > span {
    top: -20px;
    position: absolute;
  }
`;

export const BarUl = styled('ul')`
  display: flex;
  color: gray;
  font-size: 12px;
  font-weight: 600;
  justify-content: center;
  list-style: none;
  margin-left: 25px;
  height: 100%;
}
`;

export const BarLi = styled('li')`
  display: flex;
  justify-content: center;
  flex: 1;
  position: relative;

  & > span {
    bottom: -30px;
    text-align: center;
    position: absolute;
  }
`;
