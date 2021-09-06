/* eslint-disable */

const hasChildNodeArr: any[] = [];
const d3 = window.d3;
var rootRectWidth = 0; //根节点rect的宽度
var downwardLength = 0;
var upwardLength = 0;
var forUpward = true;
var borderColor = null;

function expand(d) {
  if (d._children) {
    d.children = d._children;
    d.children.forEach(expand);
    d._children = null;
  }
}

function collapse(d, arr) {
  if (d.children && d.children.length != 0) {
    d._children = d.children;
    d._children.forEach((d) => collapse(d, arr));
    d.children = null;
    // arr.push(d);
  }
}

function sortByDate(a, b) {
  var aNum = a.name.substr(a.name.lastIndexOf('(') + 1, 4);
  var bNum = b.name.substr(b.name.lastIndexOf('(') + 1, 4);
  return d3.ascending(aNum, bNum) || d3.ascending(a.name, b.name) || d3.ascending(a.id, b.id);
}
// 测试内容
var Tree = function (params: any) {
  this.d3 = window.d3;
  this.directions = params.directions;
  this.rootData = params.data;
  this.containerId = params.containerId || '#product_tree';
  this.borderColor = params?.borderColor;
};

Tree.prototype.drawChart = function () {
  // First get tree data for both directions.
  this.treeData = {};
  var self = this;
  self.directions.forEach(function (direction) {
    self.treeData[direction] = self.rootData[direction];
  });
  // rootName = '上海冰鉴信息科技有限公司';
  rootRectWidth = self.rootData.rootName.length * 15;
  //获得upward第一级节点的个数
  upwardLength = self.rootData.upward.children.length;
  //获得downward第一级节点的个数
  downwardLength = self.rootData.downward.children.length;
  self.graphTree(self.getTreeConfig());
};

Tree.prototype.getTreeConfig = function () {
  const self = this;
  var treeConfig = {
    self,
    containerId: self.containerId,
    margin: {
      top: 10,
      right: 5,
      bottom: 0,
      left: 30,
    },
  };
  const heightCut = self.directions.length === 1 ? 10 : 3;
  const dom = document.querySelector(self.containerId) as HTMLElement;
  let width = '800px';
  let height = '600px';
  if (dom) {
    const attr = window.getComputedStyle(dom, null);
    width = attr.width;
    height = attr.height;
  }
  width = +width.split('px')[0];
  height = +height.split('px')[0];
  console.log('width', width);
  console.log('height', height);

  treeConfig.chartWidth = width - treeConfig.margin.right - treeConfig.margin.left;
  treeConfig.chartHeight = height - treeConfig.margin.top - treeConfig.margin.bottom;
  treeConfig.centralHeight = treeConfig.chartHeight / heightCut;
  treeConfig.centralWidth = treeConfig.chartWidth / 2;
  treeConfig.linkLength = 120;
  treeConfig.duration = 500; //动画时间
  console.log('treeConfig', treeConfig);
  return treeConfig;
};
Tree.prototype.diagonal = d3.svg
  .diagonal()
  .source(function (d) {
    return {
      x: d.source.x,
      y:
        d.source.name == 'origin'
          ? forUpward
            ? d.source.y - 20
            : d.source.y + 40
          : forUpward
          ? d.source.y - 60
          : d.source.y + 80,
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
Tree.prototype.graphTree = function (config) {
  var self = this;
  var d3 = this.d3;
  var linkLength = config.linkLength;
  var duration = config.duration;
  var id = 0;

  var zoom = d3.behavior.zoom().scaleExtent([0.5, 2]).on('zoom', redraw);
  var svg = d3
    .select(config.containerId)
    .append('svg')
    .attr('width', config.chartWidth + config.margin.right + config.margin.left)
    .attr('height', config.chartHeight + config.margin.top + config.margin.bottom)
    .attr('xmlns', 'http://www.w3.org/2000/svg')
    .on('mousedown', disableRightClick)
    .call(zoom)
    .on('dblclick.zoom', null);
  var treeG = svg.append('g').attr('class', 'gbox');
  // .attr('transform', 'translate(' + config.margin.left + ',' + config.margin.top + ')');

  //箭头(下半部分)
  var markerDown = svg
    .append('marker')
    .attr('id', 'resolvedDown')
    .attr('markerUnits', 'strokeWidth') //设置为strokeWidth箭头会随着线的粗细发生变化
    .attr('markerUnits', 'userSpaceOnUse')
    .attr('viewBox', '0 -5 10 10') //坐标系的区域
    .attr('refX', 0) //箭头坐标
    .attr('refY', 0)
    .attr('markerWidth', 8) //标识的大小
    .attr('markerHeight', 8)
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
    .attr('markerWidth', 8) //标识的大小
    .attr('markerHeight', 8)
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
    // data.children.forEach((d) => collapse(d, hasChildNodeArr));
    data.children.forEach(collapse);
    update(data, data, treeG);
  }
  function update(source, originalData, g) {
    console.log(source);
    var direction = originalData['direction'];
    forUpward = direction == 'upward';
    var node_class = direction + 'Node';
    var link_class = direction + 'Link';
    var downwardSign = forUpward ? -1 : 1;
    // var nodeColor = forUpward ? '#37592b' : '#8b4513';

    var isExpand = false;
    // var statusUp = true;
    // var statusDown = true;
    var nodeSpace = 130; // 各个node块相距的距离
    var tree = d3.layout.tree().sort(sortByDate).nodeSize([nodeSpace, 0]);
    var nodes = tree.nodes(originalData);
    var links = tree.links(nodes);
    var offsetX = -config.centralWidth;
    nodes.forEach(function (d) {
      d.y = downwardSign * (d.depth * linkLength) + config.centralHeight;
      d.x = d.x - offsetX;
      if (d.name == 'origin') {
        d.x = config.centralWidth;
        d.y += downwardSign * 0; // 上下两树图根节点之间的距离
      }
    });

    // Update the node.
    var node = g.selectAll('g.' + node_class).data(nodes, function (d) {
      return d.id || (d.id = ++id);
    });
    var nodeEnter = node
      .enter()
      .append('g')
      .attr('class', node_class)
      .attr('transform', function (d) {
        return 'translate(' + source.x0 + ',' + source.y0 + ')';
      })
      .style('cursor', function (d) {
        return d.name == 'origin' ? '' : d.children || d._children ? 'pointer' : '';
      });
    // .on('click', click);

    nodeEnter
      .append('svg:rect')
      .attr('x', function (d) {
        return -60;
      })
      .attr('y', function (d) {
        return d.name == 'origin' ? -20 : forUpward ? -52 : 12;
      })
      .attr('width', function (d) {
        return 120;
      })
      .attr('height', 60)
      .attr('rx', 2)
      .style('stroke', function (d) {
        console.log(32323,d.name == 'origin');
        if ( d.name == 'origin') {
          return '#ccc';
        } else if (self.borderColor) {
          // 如果外面传入边框颜色，则以传入为准,传入格式如下
          //borderColor: { upward: '#81D3F8', downward: '#F59A23' }
          return self.borderColor[source.direction];
        }
        return '#ccc';
      })
      .style('fill', function (d) {
        return '#FFF'; //节点背景色
      });

    nodeEnter.append('circle').attr('r', 1e-6);
    nodeEnter
      .append('text')
      .attr('class', 'linkname l0')
      .attr('x', function (d) {
        return '0';
      })
      .attr('dy', function (d) {
        return d.name == 'origin' ? '15' : forUpward ? '-20' : '45';
      })
      .attr('text-anchor', function (d) {
        return 'middle';
      })
      .attr('fill', '#000')
      .text(function (d) {
        if (d.name == 'origin') {
          // return ((forUpward) ? '根节点TOP' : '根节点Bottom');
          return config.self.rootData.rootName;
        }
        return d.name.length > 8 ? d.name.substring(0, 8) + '...' : d.name;
      })
      .style({
        'fill-opacity': 1e-6,
        'font-size': function (d) {
          return 14;
        },
        cursor: 'pointer',
      });
    // .on('click', Change_modal);

    nodeEnter
      .append('text')
      .attr('x', '0')
      .attr('dy', function (d) {
        return d.name == 'origin' ? '.35em' : forUpward ? '-16' : '65';
      })
      .attr('text-anchor', 'middle')
      .attr('class', 'linkname l2')
      .style('fill', '#000')
      .style('font-size', 12)
      .text(function (d) {
        if (d.desc) {
          return `${d.desc}`;
        }
        return '';
      });

    // Transition nodes to their new position.原有节点更新到新位置
    var nodeUpdate = node
      .transition()
      .duration(duration)
      .attr('transform', function (d) {
        return 'translate(' + d.x + ',' + d.y + ')';
      });
    nodeUpdate
      .select('circle')
      .attr('r', function (d) {
        if ((d._children || d.children) && d.name !== 'origin') {
          return 6;
        } else {
          return 0;
        }
      })
      .attr('cy', function (d) {
        return forUpward ? -59 : 79;
      })
      .style('fill', function (d) {
        if (d._children || d.children) {
          return '#9fd4fd';
        } else {
          return 'rgba(0,0,0,0)';
        }
      })
      .style('stroke', function (d) {
        return hasChildNodeArr.indexOf(d) != -1 ? '' : '';
        // if (d._children || d.children) { return "#8b4513"; } else { return "rgba(0,0,0,0)"; }
      })
      // .style('fill-opacity', function (d) {
      //   if (d.children) {
      //     return 0.35;
      //   }
      // })
      // Setting summary node style as class as mass style setting is
      // not compatible to circles.
      .style('stroke-width', function (d) {
        // if (d.repeated) {
        //   return 5;
        // }
      });
    //代表是否展开的+-号
    nodeEnter
      .append('svg:text')
      .attr('class', 'isExpand')
      .attr('x', '0')
      .attr('dy', function (d) {
        return forUpward ? -55 : 83;
      })
      .attr('text-anchor', 'middle')
      .style('fill', '#fff')
      .text(function (d) {
        if (d.name == 'origin') {
          return '';
        }
        if (d._children || d.children) {
          return '+';
        }
      })
      .on('click', click);

    nodeUpdate.select('text').style('fill-opacity', 1);

    var nodeExit = node
      .exit()
      .transition()
      .duration(duration)
      .attr('transform', function (d) {
        return 'translate(' + source.x + ',' + source.y + ')';
      })
      .remove();
    nodeExit.select('circle').attr('r', 1e-6);
    nodeExit.select('text').style('fill-opacity', 1e-6);

    var link = g.selectAll('path.' + link_class).data(links, function (d) {
      return d.target.id;
    });

    link
      .enter()
      .insert('path', 'g')
      .attr('class', link_class)
      .attr('stroke', function (d) {
        return '#666';
      })
      .attr('fill', 'none')
      .attr('stroke-width', '1px')
      .attr('opacity', 0.5)
      .attr('d', function (d) {
        var o = {
          x: source.x0,
          y: source.y0,
        };
        return self.diagonal({
          source: o,
          target: o,
        });
      })
      .attr('marker-end', function (d) {
        return forUpward ? 'url(#resolvedUp)' : 'url(#resolvedDown)';
      }) //根据箭头标记的id号标记箭头;
      .attr('id', function (d, i) {
        return 'mypath' + i;
      });
    link.transition().duration(duration).attr('d', self.diagonal);
    link
      .exit()
      .transition()
      .duration(duration)
      .attr('d', function (d) {
        var o = {
          x: source.x,
          y: source.y,
        };
        return self.diagonal({
          source: o,
          target: o,
        });
      })
      .remove();
    nodes.forEach(function (d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });
    // function Change_modal() {
    //   _this.Modal = true;
    // }
    function click(d) {
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
        if (d.name == 'origin') {
          d.children.forEach(expand);
        }
        d3.select(this).text('-');
      }
      update(d, originalData, g);
    }
  }

  function redraw() {
    treeG.attr(
      'transform',
      'translate(' + d3.event.translate + ')' + ' scale(' + d3.event.scale + ')',
    );
  }

  function disableRightClick() {
    // stop zoom
    if (d3.event.button == 2) {
      console.log('No right click allowed');
      d3.event.stopImmediatePropagation();
    }
  }
};
export default Tree;
// var d3GenerationChart = new treeChart();
// d3GenerationChart.drawChart();

//   var downloadfun = function() { //下载

//       // 注释该方法为svg 直接下载
//       //  var SvgSaver = require('svgsaver');                 // if using CommonJS environment
//       //  var svgsaver = new SvgSaver();                      // creates a new instance
//       //  var svg = document.querySelector('#product_tree');         // find the SVG element
//       //  svgsaver.asSvg(svg);                                // save as SVG

//       var g = document.getElementById('product_tree').getElementsByTagName('g')[0].getBBox();
//       var gbox = document.getElementById('product_tree').getElementsByClassName('gbox')[0];
//       var x = -g.x;//计算偏移位置
//       var y = -g.y;
//       gbox.style.transform = "translate(" + x + 'px' + "," + y + "px" + ")  scale(1)"; //偏移位置
//       var svgbox = $('#product_tree svg')
//       var boxwidth = svgbox.width;
//       var boxheight = svgbox.height;
//       svgbox.attr('width', g.width)
//       svgbox.attr('height', g.height)
//       var canvas = document.createElement("canvas");
//       var c = canvas.getContext('2d');
//       //新建Image对象
//       //svg内容
//       var svg = document.getElementById('product_tree').innerHTML;
//       var img = new Image();

//       img.src = 'data:image/svg+xml,' + unescape(encodeURIComponent(svg));//svg内容中可以有中文字符
//       img.src = 'data:image/svg+xml,' + svg;//svg内容中不能有中文字符
//       img.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svg)));
//       //图片初始化完成后调用
//        img.onload = function() {
//         //将canvas的宽高设置为图像的宽高
//         canvas.width = img.width;
//         canvas.height = img.height+60;
//         c.fillStyle = "#fff";
//         c.fillRect(0, 0, canvas.width, canvas.height);
//         c.drawImage(img, 0, 30);
//         //canvas画图片

//         var a = document.createElement("a");
//         a.download = "png";
//         a.href= canvas.toDataURL("image/png");
//         a.click();
//       }
//       //图片转换为base64后 传给后端 发邮件
//       gbox.style.transform = ''
//      // svgbox.attr('width',boxwidth)
//      // svgbox.attr('height',boxheight)
//       svgbox.attr('width',1100)
//       svgbox.attr('height',600)

//   // 结束
// }
