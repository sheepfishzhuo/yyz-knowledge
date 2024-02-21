# Open3D 计算点云平均密度（版本二）


## 一、算法原理


  采样设备不同、设备距离场景远近不同，会使点云密度产生差异。现有的对点云密度的估算方法有基于距离的方法和基于分块的方法。基于距离的平均距离密度密度表示法是通过计算点云各点的距离平均值来估算点云分布疏密程度，点的距离一般点云某一点$p$与点云中距离点$p$最近的点的距离。在点数为$C$中，用$dis(p,q)$表示点$p$与其他任意点$q$之间的距离，用$d_p$​表示点p与其他点的最小距离，则有：  

$$
\mathrm d_{\mathrm p}=\min(\mathrm d\mathrm is(\mathrm p,\mathrm q)),\mathrm q=1,2,\cdots,\mathrm N,\mathrm p\neq\mathrm q
$$
    则点云的平均距离密度为：
$$
\overline{d}=\frac1N\sum_{p=1}^Nd_p
$$

     平均距离$\overline{d}$越小，点云分布越密集，密度则越大； $\overline{d}$越大，点云分布越稀疏，密度则越小。因此通过平均距离来估算点云密度可行。


## 二、代码实现

```python
import open3d as o3d
import numpy as np
from matplotlib import pyplot as plt

# -------------------------读取点云-----------------------------
pcd = o3d.io.read_point_cloud("data//tree.pcd")
print(pcd)
# ------------------------计算平均密度--------------------------
nndist = pcd.compute_nearest_neighbor_distance()
nndist = np.array(nndist)
density = np.mean(nndist)  # 计算平均密度
print("点云密度为 denstity=", density)
# ---------------------使用伪颜色显示最近邻点--------------------
density_colors = plt.get_cmap('hot')(
    (nndist - nndist.min()) / (nndist.max() - nndist.min()))
density_colors = density_colors[:, :3]
pcd.colors = o3d.utility.Vector3dVector(density_colors)
o3d.visualization.draw_geometries([pcd], window_name="计算平均密度",
                                  width=1024, height=768,
                                  left=50, top=50,
                                  mesh_show_back_face=False)
```

## 三、结果展示

```
点云密度为 denstity= 0.02979291524516438
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/7a906a0b351d4b3aa338ec7490003581.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA54K55LqR5L6g,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
