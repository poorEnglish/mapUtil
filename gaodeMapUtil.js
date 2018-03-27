export default {
    //画单个棱点,这
     addRegularPrism = function (point, segment, radius,map,object3Dlayer) {
        let cylinder = new AMap.Object3D.Mesh();
        let height=point.height;
        let center=map.lngLatToGeodeticCoord(new AMap.LngLat(point.center.x, point.center.y));
        let geometry = cylinder.geometry;
        let verticesLength = segment * 3;
        drawPrism(segment,geometry,center,height,0);
        object3Dlayer.add(cylinder);
    },
    //画多个棱点
    addRegularPrismArr(pointArray, segment, radius,map,object3Dlayer) {
        let cylinder = new AMap.Object3D.Mesh();
        let geometry = cylinder.geometry;
        let verticesLength = segment * 3;
        pointArray.forEach(function (point, i) {
            let center = map.lngLatToGeodeticCoord(new AMap.LngLat(point.center.x, point.center.y));
            let height = point.height;
            drawPrism(segment,geometry,center,height,i);
        });
        object3Dlayer.add(cylinder);
    },
    //棱点的绘制
    drawPrism=function(segment,geometry,center,height,j){
        for (let i = 0; i < segment; i++) {
            let verticesLength=segment*3;
            let angle = 2 * Math.PI * i / segment;
            let x = center.x + Math.cos(angle) * radius;
            let y = center.y + Math.sin(angle) * radius;
            geometry.vertices.push(center.x, center.y, -height - radius); //上顶部顶点
            geometry.vertices.push(x, y, -height); //中顶点
            geometry.vertices.push(center.x, center.y, -height + radius); //下顶部顶点
            geometry.vertexColors.push.apply(geometry.vertexColors, topColor) //顶部颜色
            geometry.vertexColors.push.apply(geometry.vertexColors, bottomColor) //底部颜色
            geometry.vertexColors.push.apply(geometry.vertexColors, topColor) //顶部颜色
            let indexes = i * 3;
            //每个单独的菱形的面各自连接
            let topIndex = (indexes) % verticesLength + verticesLength * j;
            let middleIndex = (indexes + 1) % verticesLength + verticesLength * j;
            let nextMiddleIndex = (indexes + 4) % verticesLength + verticesLength * j;
            let bottmIndex = (indexes + 2) % verticesLength + verticesLength * j;
            geometry.faces.push(middleIndex, topIndex, nextMiddleIndex) //侧面三角形2
            geometry.faces.push(middleIndex, bottmIndex, nextMiddleIndex) //侧面三角形2
        }
    }
}