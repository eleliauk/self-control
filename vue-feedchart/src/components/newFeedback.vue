<template>
    <div class="page" >
        <div class="right">
            <div class="main">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>课堂学习情况</span>
                    </div>
                    <div v-html="this.classLearningSummary"></div>
                    <div id="classLearning-option" style="height: 360px"></div>
                </el-card>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>预习情况</span>
                    </div>
                    <div v-html="this.previewSummary"></div>
                    <div id="preview-option" style="height: 360px"></div>
                </el-card>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>复习情况</span>
                    </div>
                    <div v-html="this.reviewSummary"></div>
                    <div id="review-option" style="height: 360px"></div>
                </el-card>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>作业情况</span>
                    </div>
                    <div v-html="this.homeworkSummary"></div>
                    <div id="homework-option" style="height: 360px"></div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    data () {
        //const _this = this;
        return {
            classLearningSummary : null,
            previewSummary : null,
            reviewSummary : null,
            homeworkSummary : null,
            classLearningOption : {
                title: {
                    text: '课堂学习情况',
                    left: '49%',
                    textAlign: 'center',
                },
                legend: {
                    itemWidth: 30,
                    data: ["语文", "数学","英语"],
                    bottom: "10px",
                },
                xAxis: {
                    type: 'category',
                    data: ['专注听讲', '认真思考', '积极参与', '内容掌握度']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                {
                   name:'语文',
                   type:'bar',
                   data:[4,4,5,4],
                    // data:[0],
                    barGap:'10%',
                    label: {
                        normal: {
                            show:true,
                            position:'top'
                        }
                    },
           },
           {
                name:'数学',
                type:'bar',
                // data:[0],
                data:[2,3,3,3],
                barGap:'10%',
                    label: {
                        normal: {
                            show:true,
                            position:'top'
                        }
                    },
            },
           {
                name:'英语',
                type:'bar',
                // data:[0],
                data:[2,1,1,2],
                barGap:'10%',
                    label: {
                        normal: {
                            show:true,
                            position:'top'
                        }
                    },
            }],
                color:['#4472c4','#ed7d31','#a5a5a5']
            },
            previewOption : {
                title: {
                    text: '预习情况',
                    left: '49%',
                    textAlign: 'center',
                },
                xAxis: {
                    type: 'category',
                    data: ['预习完成度', '学习材料通读', '重难点标注', '主动提出疑问']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        // data: [0],
                        data: [5,4,5,5],
                        type: 'bar',
                        label: {
                            show: true,
                            position: 'top'
                        },
                    }
                ]
            },
            reviewOption : {
                title: {
                    text: '复习情况',
                    left: '49%',
                    textAlign: 'center',
                },
                xAxis: {
                    type: 'category',
                    data: ['复习完成度', '回忆复述新知', '积极查漏补缺', '知识关系梳理']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        // data: [0],
                        data: [2,2,3,2],
                        type: 'bar',
                        label: {
                            show: true,
                            position: 'top'
                        },
                    }
                ]
            },
            homeworkOption : {
                title: {
                    text: '作业情况',
                    left: '49%',
                    textAlign: 'center',
                },
                xAxis: {
                    type: 'category',
                    data: ['作业完成度', '完成效率', '专注度', '作业反思']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        // data: [0],
                        data: [1,2,3,5],
                        type: 'bar',
                        label: {
                            show: true,
                            position: 'top'
                        },
                    }
                ]
            }
        }
    },
    created () {
        this.$nextTick(()=>{
            this.initCharts()
        });
        // 调用接口获得数据

    },
    methods: {
        // 数据赋给图表
        getAnalysisData(result){
            let hasData = result != null && JSON.stringify(result) != '{}';
            if(hasData){
                this.classLearningSummary = result.classLearningSummary,
                this.previewSummary = result.previewSummary,
                this.reviewSummary = result.reviewSummary,
                this.homeworkSummary = result.homeworkSummary,
                this.classLearningOption.series[0].data = result.classLearningOptionOneList
                this.classLearningOption.series[1].data = result.classLearningOptionTwoList
                this.classLearningOption.series[2].data = result.classLearningOptionThreeList
                this.previewOption.series[0].data = result.previewOptionList
                this.reviewOption.series[0].data = result.reviewOptionList
                this.homeworkOption.series[0].data = result.homeworkOptionList
            }
            this.initCharts(hasData);
        },
        initCharts(hasData){
            if(!hasData && hasData !== undefined){
                this.classLearningSummary = null,
                this.previewSummary = null,
                this.reviewSummary = null,
                this.homeworkSummary = null,
                this.classLearningOption.series[0].data = [0]
                this.classLearningOption.series[1].data = [0]
                this.classLearningOption.series[2].data = [0]
                this.previewOption.series[0].data = [0]
                this.reviewOption.series[0].data = [0]
                this.homeworkOption.series[0].data = [0]
            }

            this.chartInstances = [
                echarts.init(document.getElementById('classLearning-option')).setOption(this.classLearningOption),
                echarts.init(document.getElementById('preview-option')).setOption(this.previewOption),
                echarts.init(document.getElementById('review-option')).setOption(this.reviewOption),
                echarts.init(document.getElementById('homework-option')).setOption(this.homeworkOption)
            ]
        }

    }
};
</script>

<style lang="scss" scoped>
.page {
    background: white;
    display: flex;
    height: 100%;
    .right{
        width: 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        .main{
            height: 0;
            flex:1;
            overflow-y: scroll;
        }
    }
}
    .box-card{
        margin-bottom: 12px;
    }
</style>
