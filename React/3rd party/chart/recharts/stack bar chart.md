```tsx
import { Bar, BarChart, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

// #region Sample data
const data = [
  {
    name: 'Page A',
    uv: 400,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 300,
    pv: 4567,
    amt: 2400,
  },
  {
    name: 'Page C',
    uv: 300,
    pv: 1398,
    amt: 2400,
  },
  {
    name: 'Page D',
    uv: 200,
    pv: 9800,
    amt: 2400,
  },
  {
    name: 'Page E',
    uv: 278,
    pv: 3908,
    amt: 2400,
  },
  {
    name: 'Page F',
    uv: 189,
    pv: 4800,
    amt: 2400,
  },
];

const margin = {
  top: 20,
  right: 30,
  left: 20,
  bottom: 5,
};
// #endregion

// 툴팁에 표시될 페이지 설명을 가져오는 함수 (이전과 동일)
function getIntroOfPage(label: string): string {
  if (label === 'Page A') {
    return "Page A is about men's clothing";
  }
  if (label === 'Page B') {
    return "Page B is about women's dress";
  }
  if (label === 'Page C') {
    return "Page C is about women's bag";
  }
  if (label === 'Page D') {
    return 'Page D is about household goods';
  }
  if (label === 'Page E') {
    return 'Page E is about food';
  }
  if (label === 'Page F') {
    return 'Page F is about baby food';
  }
  return '';
}

// 사용자 정의 툴팁 컴포넌트 (이전과 동일)
function CustomTooltip({ payload, label, active }: any) {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          border: '1px solid #d88488',
          backgroundColor: '#fff',
          padding: '10px',
          borderRadius: '5px',
          boxShadow: '1px 1px 2px #d88488',
        }}
      >
        {/* 툴팁에 표시되는 모든 데이터 항목 출력 */}
        <p className="label" style={{ margin: '0 0 5px 0', fontWeight: '700' }}>{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ margin: '0', color: entry.color }}>
            {`${entry.name} : ${entry.value}`}
          </p>
        ))}
        <p className="intro" style={{ margin: '5px 0 0 0', borderTop: '1px dashed #eee', paddingTop: '5px' }}>
          {getIntroOfPage(label)}
        </p>
      </div>
    );
  }

  return null;
}

// 스택형 막대 차트 컴포넌트
export default function CustomizeTooltipContent() {
  return (
    <BarChart width={600} height={300} data={data} margin={margin}>
      {/* 배경 그리드 추가 (선택 사항) */}
      <CartesianGrid strokeDasharray="3 3" /> 
      
      <XAxis dataKey="name" />
      <YAxis />
      
      {/* 범례 추가: 각 바의 색상이 어떤 dataKey를 의미하는지 보여줍니다. */}
      <Legend />
      
      {/* 툴팁 컴포넌트 연결 */}
      <Tooltip content={<CustomTooltip />} />
      
      {/* [핵심] 스택형 막대 설정:
        1. dataKey="uv"와 dataKey="pv"에 동일한 stackId="a"를 지정하여 하나의 막대에 쌓이게 합니다.
      */}
      <Bar dataKey="uv" stackId="a" fill="#8884d8" name="UV Data" />
      <Bar dataKey="pv" stackId="a" fill="#82ca9d" name="PV Data" />
      
      {/* 2. dataKey="amt"는 stackId를 지정하지 않거나 다른 stackId("b")를 지정하여 
           별도의 막대로 표시됩니다. (여기서는 stackId를 지정하지 않아 기본적으로 분리됩니다.)
      */}
      <Bar dataKey="amt" fill="#ffc658" name="AMT Data" />
    </BarChart>
  );
}
```

![](https://imgur.com/jbhXRZl.png)