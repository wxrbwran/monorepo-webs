import React, {useEffect} from "react";
import { G2, Chart, Geom, Axis, Tooltip, Legend, Shape, Facet, Util } from "bizcharts";

interface IProps {
  data: object[];
}
interface ICfg {
  interval: string | number;
  style: object;
  color: string;
  opacity: string;
}
export default function PatientChart({data}: IProps) {
  function getRectPath(points:any) {
    const path = [];
    for (let i = 0; i < points.length; i++) {
      const point = points[i];

      if (point) {
        const action = i === 0 ? "M" : "L";
        path.push([action, point.x, point.y]);
      }
    }

    const first = points[0];
    path.push(["L", first.x, first.y]);
    path.push(["z"]);
    return path;
  }
  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];

      if (i > 0 && i < data.length - 1) {
        if (Util.isArray(data[i - 1].count)) {
          item.count = [
            data[i - 1].count[1],
            item.count + data[i - 1].count[1]
          ];
        } else {
          item.count = [data[i - 1].count, item.count + data[i - 1].count];
        }
      }
      console.log('6789999', item)
    }
  }, [data])
  function getFillAttrs(cfg: ICfg) {
    // @ts-ignore
    const defaultAttrs = Shape.interval;
    const attrs = Util.mix(
      {},
      cfg.style,
      defaultAttrs,
      {
        fill: cfg.color,
        stroke: cfg.color,
        fillOpacity: cfg.opacity,
      }
    );
    return attrs;
  }
  // @ts-ignore
  Shape.registerShape("interval", "waterfall", {
    // @ts-ignore
    draw(cfg, container) {
      const attrs = getFillAttrs(cfg);
      let rectPath = getRectPath(cfg.points);
      rectPath = this.parsePath(rectPath);
      const interval = container.addShape("path", {
        attrs: Util.mix(attrs, {
          path: rectPath
        })
      });

      if (cfg.nextPoints) {
        let linkPath = [
          ["M", cfg.points[2].x, cfg.points[2].y],
          ["L", cfg.nextPoints[0].x, cfg.nextPoints[0].y]
        ];

        if (cfg.nextPoints[0].y === 0) {
          linkPath[1] = ["L", cfg.nextPoints[1].x, cfg.nextPoints[1].y];
        }

        linkPath = this.parsePath(linkPath);
        container.addShape("path", {
          attrs: {
            path: linkPath,
            stroke: "rgba(0, 0, 0, 0.45)",
            lineDash: [4, 2]
          }
        });
      }

      return interval;
    }
  });
  
  return (
    <div>
      <Chart height={383} data={data} forceFit padding={[20, 'auto', 'auto', 'auto']}>
        <Legend
          custom={true}
          clickable={false}
          items={[
            {
              value: "各项目人数",
              marker: {
                symbol: "square",
                fill: '#1890FF',
                radius: 5
              }
            },
            {
              value: "受试者总人次",
              marker: {
                symbol: "square",
                fill: "#8c8c8c",
                radius: 5
              }
            }
          ]}
        />
        <Axis name="projectName"/>
        <Axis name="count" />
        <Tooltip 
          g2-tooltip={{
            boxShadow: 'none',
            color: '#fff',
            backgroundColor: 'rgba(0,0,0,0.8)',
          }}
        />
        <Geom
          type="interval"
          position="projectName*count"
          color={[
            "projectName",
            projectName => {
              if (projectName === "受试者总人次") {
                return "#8C8C8C";
              }

              return "#1890FF";
            }
          ]}
          tooltip={[
            "projectName*count",
            (projectName, count) => {
              if (Util.isArray(count)) {
                return {
                  name: "项目人次",
                  value: Number(count[1]) - Number(count[0])
                };
              }
              return {
                name: "项目人次",
                value: count
              };
            }
          ]}
          shape="waterfall"
          size={['', () => { // 柱子的宽度
            let width = 31;
            return width
          }]}
        />
      </Chart>
    </div>
  );
}
