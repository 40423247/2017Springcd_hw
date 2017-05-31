var tipuesearch = {"pages":[{"text":"單一正齒輪 window.onload=function(){ // 設定 data/py 為共用程式路徑 brython({debug:1, pythonpath:['./../data/py']}); } from browser import document as doc import math # deg 為角度轉為徑度的轉換因子 deg = math.pi/180. # 定義 Spur 類別 class Spur(object): def __init__(self, ctx): self.ctx = ctx def create_line(self, x1, y1, x2, y2, width=3, fill=\"red\"): self.ctx.beginPath() self.ctx.lineWidth = width self.ctx.moveTo(x1, y1) self.ctx.lineTo(x2, y2) self.ctx.strokeStyle = fill self.ctx.stroke() # # 定義一個繪正齒輪的繪圖函式 # midx 為齒輪圓心 x 座標 # midy 為齒輪圓心 y 座標 # rp 為節圓半徑, n 為齒數 # pa 為壓力角 (deg) # rot 為旋轉角 (deg) # 已經針對 n 大於等於 52 齒時的繪圖錯誤修正, 因為 base circle 與齒根圓大小必須進行判斷 def Gear(self, midx, midy, rp, n=20, pa=20, color=\"black\"): # 齒輪漸開線分成 15 線段繪製 imax = 15 # 在輸入的畫布上繪製直線, 由圓心到節圓 y 軸頂點畫一直線 self.create_line(midx, midy, midx, midy-rp) # 畫出 rp 圓, 畫圓函式尚未定義 #create_oval(midx-rp, midy-rp, midx+rp, midy+rp, width=2) # a 為模數 (代表公制中齒的大小), 模數為節圓直徑(稱為節徑)除以齒數 # 模數也就是齒冠大小 a=2*rp/n # d 為齒根大小, 為模數的 1.157 或 1.25倍, 這裡採 1.25 倍 d=2.5*rp/n # ra 為齒輪的外圍半徑 ra=rp+a # 畫出 ra 圓, 畫圓函式尚未定義 #create_oval(midx-ra, midy-ra, midx+ra, midy+ra, width=1) # rb 則為齒輪的基圓半徑 # 基圓為漸開線長齒之基準圓 rb=rp*math.cos(pa*deg) # 畫出 rb 圓 (基圓), 畫圓函式尚未定義 #create_oval(midx-rb, midy-rb, midx+rb, midy+rb, width=1) # rd 為齒根圓半徑 rd=rp-d # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd # 畫出 rd 圓 (齒根圓), 畫圓函式尚未定義 #create_oval(midx-rd, midy-rd, midx+rd, midy+rd, width=1) # dr 則為基圓到齒頂圓半徑分成 imax 段後的每段半徑增量大小 # 將圓弧分成 imax 段來繪製漸開線 # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: dr = (ra-rd)/imax else: dr=(ra-rb)/imax # tan(pa*deg)-pa*deg 為漸開線函數 sigma=math.pi/(2*n)+math.tan(pa*deg)-pa*deg for j in range(n): ang=-2.*j*math.pi/n+sigma ang2=2.*j*math.pi/n+sigma lxd=midx+rd*math.sin(ang2-2.*math.pi/n) lyd=midy-rd*math.cos(ang2-2.*math.pi/n) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(alpha-ang) ypt=r*math.cos(alpha-ang) xd=rd*math.sin(-ang) yd=rd*math.cos(-ang) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由左側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): lfx=midx+xpt lfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # the line from last end of dedendum point to the recent # end of dedendum point # lxd 為齒根圓上的左側 x 座標, lyd 則為 y 座標 # 下列為齒根圓上用來近似圓弧的直線 self.create_line((lxd),(lyd),(midx+xd),(midy-yd),fill=color) for i in range(imax+1): # 當 rd 大於 rb 時, 漸開線並非畫至 rb, 而是 rd if rd>rb: r=rd+i*dr else: r=rb+i*dr theta=math.sqrt((r*r)/(rb*rb)-1.) alpha=theta-math.atan(theta) xpt=r*math.sin(ang2-alpha) ypt=r*math.cos(ang2-alpha) xd=rd*math.sin(ang2) yd=rd*math.cos(ang2) # i=0 時, 繪線起點由齒根圓上的點, 作為起點 if(i==0): last_x = midx+xd last_y = midy-yd # 由右側齒根圓作為起點, 除第一點 (xd,yd) 齒根圓上的起點外, 其餘的 (xpt,ypt)則為漸開線上的分段點 self.create_line((midx+xpt),(midy-ypt),(last_x),(last_y),fill=color) # 最後一點, 則為齒頂圓 if(i==imax): rfx=midx+xpt rfy=midy-ypt last_x = midx+xpt last_y = midy-ypt # lfx 為齒頂圓上的左側 x 座標, lfy 則為 y 座標 # 下列為齒頂圓上用來近似圓弧的直線 self.create_line(lfx,lfy,rfx,rfy,fill=color) canvas = doc['onegear'] ctx = canvas.getContext(\"2d\") x = (canvas.width)/2 y = (canvas.height)/2 r = 250 # 齒數 n = 36 # 壓力角 pa = 20 Spur(ctx).Gear(x, y, r, n, pa, \"blue\")","tags":"Course","url":"./Week 15.html","title":"20170531 第十五週"},{"text":"上了半學期的協同課程，除了利用github、fossil，也學了會了v-rep的簡單用法，在下半學期我們將更進一步的讓更複雜的八桿機構可以模擬行走，而且還要用更多高階的工具，來使協同更方便更輕鬆，在這堂課中，你必須學習排解問題的能力，遇到問題時要自己嘗試去解決，我覺得這是很重要的一個環節，也希望我能有更多的機會，可以學到更多的東西。","tags":"Course","url":"./Week 8.html","title":"20170419 期中自評"},{"text":"Fossil上傳方法 Fossil上傳方法 from 40423247 on Vimeo .","tags":"Course","url":"./Week 7.html","title":"20170405 第七週"},{"text":"利用V-rep讓四連桿機構轉動 四連桿機構轉動 from 40423247 on Vimeo .","tags":"Course","url":"./Week 6.html","title":"20170329 第六週"},{"text":"利用V-rep讓單桿機構轉動 單連桿V-rep轉動 from 40423247 on Vimeo .","tags":"Course","url":"./Week 5.html","title":"20170322 第五週"},{"text":"建立各組協同主機 2017springcd_bg8: https://mde2a2.kmol.info/cdbg8 單桿機構 利用SolveSpace畫出單桿機構組件 單桿機構組件 from 40423247 on Vimeo . 利用SolveSpace組合單桿機構 組合單桿機構 from 40423247 on Vimeo . 單連桿SolveSpace導入v-rep 單連桿導入v-rep from 40423247 on Vimeo .","tags":"Course","url":"./Week 4.html","title":"20170315 第四週"},{"text":"四連桿組件-1(30mm) from 40423247 on Vimeo . 四連桿組件-2(60mm) from 40423247 on Vimeo . 四連桿組合 from 40423247 on Vimeo . 利用Onshape畫出簡單的四連桿機構, 觀察該機構的運動方式","tags":"Course","url":"./Week 3.html","title":"20170308 第三週"},{"text":"四連桿機構 from 劉俊成 on Vimeo . 利用Solvespace畫出簡單的四連桿機構, 觀察該機構的運動方式","tags":"Course","url":"./Week 2.html","title":"20170301第二週"},{"text":"修改stunnel.conf的IP設定 設定stunnel.conf的ip from 劉俊成 on Vimeo .","tags":"Course","url":"./Week 1.html","title":"20170222 第一週"},{"text":"40423247 Youtube","tags":"Course","url":"./youtube.html","title":"Youtube備份影片"}]};