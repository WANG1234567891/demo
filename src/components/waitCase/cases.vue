<template>
  <div class="case">
        <span>XXX信息正等待您的审核</span><el-button type="danger" size="mini">去审核</el-button>
  </div>
</template>

<script>
export default {
    name:"cases"
}
</script>

<style scoped>
     .case {
            width: 270px;
            height: 40px;
            border-radius: 5px;
            text-align: left;
            padding: 5px 10px;
            box-sizing: border-box;
            background: pink;
            font-size: 16px;
            letter-spacing: .5px;
            font-weight: bold;
        }
</style>