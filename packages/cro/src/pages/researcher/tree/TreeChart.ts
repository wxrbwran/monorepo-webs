import { expand, sortByDate } from './util';

var rootRectWidth = 0; //根节点rect的宽度
var downwardLength = 0;
var upwardLength = 0;
var forUpward = true;

class TreeChart {
  public directions: string[];
  public treeData: any;
  public rootName: string;
  constructor(data: any) {
    this.directions = [ 'downward'];
    // this.directions = [ 'upward', 'downward'];
    this.treeData = data;
    this.rootName = data.rootName;
  }
  drawChart() {
    var self = this;
    console.log(this);
    rootRectWidth = self.rootName.length * 15;
    //获得upward第一级节点的个数
    upwardLength = self.treeData?.upward?.children?.length; // 架构图不显示upward
    //获得downward第一级节点的个数
    downwardLength = self.treeData.downward.children.length;
    self.graphTree(self.getTreeConfig());
  }
  getTreeConfig() {
    var treeConfig: any = {
      margin: {
        top: 10,
        right: 5,
        bottom: 0,
        left: 30,
      },
    };
    treeConfig.chartWidth = 1000 - treeConfig.margin.right - treeConfig.margin.left;
    treeConfig.chartHeight = 600 - treeConfig.margin.top - treeConfig.margin.bottom;
    treeConfig.centralHeight = treeConfig.chartHeight / 20;
    treeConfig.centralWidth = treeConfig.chartWidth / 2;
    treeConfig.linkLength = 120;
    treeConfig.duration = 500; //动画时间
    return treeConfig;
  }

  graphTree(config: any) {
    const self = this;
    var d3 = window.d3;
    var linkLength = config.linkLength;
    var duration = config.duration;
    var id = 0;
    var diagonal = d3.svg
      .diagonal()
      .source(function (d) {
        return {
          x: d.source.x,
          y:
            d.source.name == 'origin'
              ? forUpward
                ? d.source.y - 20
                : d.source.y + 20
              : forUpward
              ? d.source.y - 60
              : d.source.y + 85,
        };
      })
      .target(function (d) {
        return {
          x: d.target.x,
          y: d.target.y,
        };
      })
      .projection(function (d) {
        return [d.x, d.y];
      });
    var zoom = window.d3.behavior.zoom().scaleExtent([0.5, 2]).on('zoom', redraw);
    var svg = d3
      .select('#product_tree')
      .append('svg')
      .attr('width', config.chartWidth + config.margin.right + config.margin.left)
      .attr('height', config.chartHeight + config.margin.top + config.margin.bottom)
      .attr('xmlns', 'http://www.w3.org/2000/svg')
      .on('mousedown', disableRightClick)
      .call(zoom)
      .on('dblclick.zoom', null);
    var treeG = svg
      .append('g')
      .attr('class', 'gbox')
      .attr('transform', 'translate(' + config.margin.left + ',' + config.margin.top + ')');

    //箭头(下半部分)
    var markerDown = svg
      .append('marker')
      .attr('id', 'resolvedDown')
      .attr('markerUnits', 'strokeWidth') //设置为strokeWidth箭头会随着线的粗细发生变化
      .attr('markerUnits', 'userSpaceOnUse')
      .attr('viewBox', '0 -5 10 10') //坐标系的区域
      .attr('refX', 0) //箭头坐标
      .attr('refY', 0)
      .attr('markerWidth', 12) //标识的大小
      .attr('markerHeight', 12)
      .attr('orient', '90') //绘制方向，可设定为：auto（自动确认方向）和 角度值
      .attr('stroke-width', 2) //箭头宽度
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5') //箭头的路径
      .attr('fill', '#000'); //箭头颜色
    //箭头(上半部分)
    var markerUp = svg
      .append('marker')
      .attr('id', 'resolvedUp')
      .attr('markerUnits', 'strokeWidth') //设置为strokeWidth箭头会随着线的粗细发生变化
      .attr('markerUnits', 'userSpaceOnUse')
      .attr('viewBox', '0 -5 10 10') //坐标系的区域
      .attr('refX', 10) //箭头坐标
      .attr('refY', 0)
      .attr('markerWidth', 12) //标识的大小
      .attr('markerHeight', 12)
      .attr('orient', '90') //绘制方向，可设定为：auto（自动确认方向）和 角度值
      .attr('stroke-width', 2) //箭头宽度
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5') //箭头的路径
      .attr('fill', '#000'); //箭头颜色

    // Initialize the tree nodes and update chart.
    for (var d in this.directions) {
      var direction = this.directions[d];
      var data = self.treeData[direction];
      data.x0 = config.centralWidth;
      data.y0 = config.centralHeight;
      data.children.forEach(expand);
      update(data, data, treeG);
    }
    function update(source: any, originalData: any, g: any) {
      console.log(self, 1111);
      console.log(source);
      var direction = originalData['direction'];
      forUpward = direction == 'upward';
      var node_class = direction + 'Node';
      var link_class = direction + 'Link';
      var downwardSign = forUpward ? -1 : 1;
      var isExpand = false;
      var nodeSpace = 130;
      var tree = d3.layout.tree().sort(sortByDate).nodeSize([nodeSpace, 0]);
      console.log('tree', tree);
      var nodes = tree.nodes(originalData);
      console.log('nodes', nodes);
      var links = tree.links(nodes);
      console.log('links', links);

      var offsetX = -config.centralWidth;
      nodes.forEach(function (d: any) {
        d.y = downwardSign * (d.depth * linkLength) + config.centralHeight;
        d.x = d.x - offsetX;
        if (d.name == 'origin') {
          d.x = config.centralWidth;
          d.y += downwardSign * 0; // 上下两树图根节点之间的距离
        }
      });

      // Update the node.
      var node = g.selectAll('g.' + node_class).data(nodes, function (d: any) {
        return d.id || (d.id = ++id);
      });
      var nodeEnter = node
        .enter()
        .append('g')
        .attr('class', node_class)
        .attr('transform', function (d: any) {
          return 'translate(' + source.x0 + ',' + source.y0 + ')';
        })
        .style('cursor', function (d: any) {
          return d.children || d._children ? 'pointer' : '';
        });

      nodeEnter
        .append('svg:rect')
        .attr('x', function (d: any) {
          return -60;
        })
        .attr('y', function (d: any) {
          return forUpward ? -52 : 12;
        })
        .attr('width', function (d: any) {
          return 120;
        })
        .attr('height', 60)
        .attr('rx', 1)
        .style('stroke', function (d: any) {
          return '#CCC';
        })
        .style('fill', function (d: any) {
          return d.subjectId === localStorage.getItem('xzl-web-doctor_sid') ? '#f2f9fc' : '#FFF'; //节点背景色
        });

      nodeEnter.append('circle').attr('r', 1e-6);

      nodeEnter
        .append('text')
        .attr('class', 'linkname')
        .attr('x', function (d: any) {
          return '0';
        })
        .attr('dy', function (d: any) {
          return forUpward ? '-40' : '24';
        })
        .attr('text-anchor', function (d: any) {
          return 'middle';
        })
        .attr('fill', '#000')
        .text(function (d: any) {
          return d.level;
        })
        .style({
          'fill-opacity': 1e-6,
          fill: function (d: any) {},
          'font-size': function (d: any) {
            return 12;
          },
          cursor: 'pointer',
        });

      nodeEnter
        .append('text')
        .attr('x', '0')
        .attr('dy', function (d: any) {
          return forUpward ? '-16' : '38';
        })
        .attr('text-anchor', 'middle')
        .attr('class', 'linkname')
        .style('fill', '#000')
        .style('font-size', 12)
        .text(function (d: any) {
          return d.name;
        });

      nodeEnter
        .append('text')
        .attr('x', '0')
        .attr('dy', function (d: any) {
          return forUpward ? '-16' : '52';
        })
        .attr('text-anchor', 'middle')
        .attr('class', 'linkname')
        .style('fill', '#000')
        .style('font-size', 12)
        .attr('title', (d) => d.firstProfessionCompany)
        .text(function (d: any) {
          return d.firstProfessionCompany.length > 10 ? `${d.firstProfessionCompany.substr(0, 9)}...` : d.firstProfessionCompany;
        });
      nodeEnter
        .append('text')
        .attr('x', '0')
        .attr('dy', function (d: any) {
          return forUpward ? '-16' : '66';
        })
        .attr('text-anchor', 'middle')
        .attr('class', 'linkname')
        .style('fill', '#000')
        .style('font-size', 12)
        .text(function (d: any) {
          return d.group?.length > 10 ? `${d.group.substr(0, 9)}...` : d.group;
        });
      // Transition nodes to their new position.原有节点更新到新位置
      var nodeUpdate = node
        .transition()
        .duration(duration)
        .attr('transform', function (d: any) {
          return 'translate(' + d.x + ',' + d.y + ')';
        });
      nodeUpdate
        .select('circle')
        .attr('r', function (d: any) {
          return d.hasChildren ? 6 : 0;
        })
        .attr('cy', function (d: any) {
          return forUpward ? -59 : 80;
        })
        .style('fill', function (d: any) {
          return d.hasChildren ? '#fff' : '';
          // if (d._children || d.children) { return "#fff"; } else { return "rgba(0,0,0,0)"; }
        })
        .style('stroke', function (d: any) {
          return d.hasChildren ? '#8b4513' : '';
          // if (d._children || d.children) { return "#8b4513"; } else { return "rgba(0,0,0,0)"; }
        })
        .style('fill-opacity', function (d: any) {
          if (d.children) {
            return 0.35;
          }
        })
        // Setting summary node style as class as mass style setting is
        // not compatible to circles.
        .style('stroke-width', function (d: any) {
          if (d.repeated) {
            return 5;
          }
        });
      //代表是否展开的+-号
      nodeEnter
        .append('svg:text')
        .attr('class', 'isExpand')
        .attr('x', '0')
        .attr('dy', function (d: any) {
          return forUpward ? -55 : 83;
        })
        .attr('text-anchor', 'middle')
        .style('fill', '#000')
        .text(function (d: any) {
          return d.hasChildren ? '-' : '';
        })
        .on('click', click);

      nodeUpdate.select('text').style('fill-opacity', 1);

      var nodeExit = node
        .exit()
        .transition()
        .duration(duration)
        .attr('transform', function (d: any) {
          return 'translate(' + source.x + ',' + source.y + ')';
        })
        .remove();
      nodeExit.select('circle').attr('r', 1e-6);
      nodeExit.select('text').style('fill-opacity', 1e-6);

      var link = g.selectAll('path.' + link_class).data(links, function (d: any) {
        return d.target.id;
      });

      link
        .enter()
        .insert('path', 'g')
        .attr('class', link_class)
        .attr('stroke', function (d: any) {
          return '#8b4513';
        })
        .attr('fill', 'none')
        .attr('stroke-width', '1px')
        .attr('opacity', 0.5)
        .attr('d', function (d: any) {
          var o = {
            x: source.x0,
            y: source.y0,
          };
          return diagonal({
            source: o,
            target: o,
          });
        })
        .attr('marker-end', function (d: any) {
          return forUpward ? 'url(#resolvedUp)' : 'url(#resolvedDown)';
        }) //根据箭头标记的id号标记箭头;
        .attr('id', function (d, i) {
          return 'mypath' + i;
        });
      link.transition().duration(duration).attr('d', diagonal);
      link
        .exit()
        .transition()
        .duration(duration)
        .attr('d', function (d: any) {
          var o = {
            x: source.x,
            y: source.y,
          };
          return diagonal({
            source: o,
            target: o,
          });
        })
        .remove();
      nodes.forEach(function (d: any) {
        d.x0 = d.x;
        d.y0 = d.y;
      });
      function click(d: any) {
        if (forUpward) {
        } else {
          if (d._children) {
            console.log('对外投资--ok');
          } else {
            console.log('对外投资--no');
          }
        }
        isExpand = !isExpand;
        if (d.name == 'origin') {
          return;
        }
        if (d.children) {
          d._children = d.children;
          d.children = null;
          d3.select(this).text('+');
        } else {
          d.children = d._children;
          d._children = null;
          // expand all if it's the first node
          // if (d.name == 'origin') {
          //   d.children.forEach(expand);
          // }
          d3.select(this).text('-');
        }
        update(d, originalData, g);
      }
    }

    function redraw() {
      treeG.attr(
        'transform',
        'translate(' + window.d3.event.translate + ')' + ' scale(' + d3.event.scale + ')',
      );
    }

    function disableRightClick() {
      // stop zoom
      if (window.d3.event.button == 2) {
        console.log('No right click allowed');
        window.d3.event.stopImmediatePropagation();
      }
    }
  }
}

export default TreeChart;
